export default (
  { filter, action },
  { database, services, logger, getSchema }
) => {
  const { ItemsService } = services;

  // hook for updating score when an answer is created in user_test
  filter(
    "user_test.items.create",
    async (payload, _meta, { database, schema }) => {
      console.log("user_test created");
      if (
        !payload.user_session_id ||
        !payload.problem ||
        !payload.answer ||
        !payload.score_category ||
        !payload.score
      ) {
        throw new Error(
          "Invalid payload: Missing user_session_id/problem/answer/score_category/score"
        );
      }

      const userTestScore = parseFloat(payload.score) || 0;

      const userSessionService = new ItemsService("user_session_test", {
        knex: database,
        accountability: null,
        schema,
      });

      const sessionData = await userSessionService.readByQuery({
        filter: {
          id: payload.user_session_id,
        },
        fields: ["score"],
        limit: 1,
      });

      if (!sessionData?.length) {
        logger.warn(
          `user_session_test ID ${payload.user_session_id} not found, score update skipped`
        );
        return payload;
      }

      const currentScore = parseFloat(sessionData[0].score) || 0;
      const updatedScore = parseFloat(
        (currentScore + userTestScore).toFixed(6)
      );

      await userSessionService.updateOne(payload.user_session_id, {
        score: updatedScore,
      });

      logger.info(
        `Score updated successfully for user_session_test ID ${payload.user_session_id}`
      );
      return payload;
    }
  );

  // hook for updating score when answer is updated in user_test
  filter(
    "user_test.items.update",
    async (payload, { keys }, { database, schema }) => {
      console.log("user_test updated");
      if (!payload.answer || !payload.score_category || !payload.score) {
        throw new Error(
          "Invalid payload: Missing answer/score_category/score"
        );
      }

      // score_category: 1 benar, -1 salah.
      const nextCategory = Number(payload.score_category);
      const nextScore = parseFloat(payload.score) || 0;

      const userSessionService = new ItemsService("user_session_test", {
        knex: database,
        accountability: null,
        schema,
      });

      for (const key of keys) {
        // Filter berjalan sebelum data ditulis, jadi row ini masih berisi
        // status & skor lama.
        const row = await database("user_test")
          .select("user_session_id", "score", "score_category")
          .where("id", key)
          .first();
        if (!row) {
          logger.warn(`user_test ID ${key} not found, score update skipped`);
          continue;
        }

        const prevCategory = Number(row.score_category);
        const prevScore = parseFloat(row.score) || 0;

        const user_session_id = payload.user_session_id || row.user_session_id;
        if (!user_session_id) continue;

        // Status tidak berubah (sama-sama benar atau sama-sama salah), skor
        // sesi tidak perlu disentuh.
        if (prevCategory === nextCategory) {
          logger.info(
            `Score category unchanged for user_test ID ${key}, score update skipped`
          );
          continue;
        }

        // Kurangi dulu skor lama yang sudah terhitung di sesi, baru tambahkan
        // skor jawaban yang baru.
        const scoreDelta = -prevScore + nextScore;
        const sessionData = await userSessionService.readByQuery({
          filter: {
            id: user_session_id,
          },
          fields: ["score"],
          limit: 1,
        });

        if (!sessionData?.length) {
          logger.warn(
            `user_session_test ID ${user_session_id} not found, score update skipped`
          );
          continue;
        }

        const currentScore = parseFloat(sessionData[0].score) || 0;
        const updatedScore = parseFloat((currentScore + scoreDelta).toFixed(6));

        await userSessionService.updateOne(user_session_id, {
          score: updatedScore,
        });

        logger.info(
          `Score updated successfully for user_session_test ID ${user_session_id}`
        );
      }

      return payload;
    }
  );

  // hook for updating score when an answer is deleted in user_test
  filter("user_test.items.delete", async (keys, _meta, { database, schema }) => {
    console.log("user_test deleted");

    const userSessionService = new ItemsService("user_session_test", {
      knex: database,
      accountability: null,
      schema,
    });

    for (const key of keys) {
      // Filter berjalan sebelum baris dihapus, jadi skor yang sudah terhitung
      // di sesi masih bisa dibaca dari row ini.
      const row = await database("user_test")
        .select("user_session_id", "score")
        .where("id", key)
        .first();
      if (!row) {
        logger.warn(`user_test ID ${key} not found, score update skipped`);
        continue;
      }

      const user_session_id = row.user_session_id;
      if (!user_session_id) continue;

      const userTestScore = parseFloat(row.score) || 0;

      const sessionData = await userSessionService.readByQuery({
        filter: {
          id: user_session_id,
        },
        fields: ["score"],
        limit: 1,
      });

      if (!sessionData?.length) {
        logger.warn(
          `user_session_test ID ${user_session_id} not found, score update skipped`
        );
        continue;
      }

      const currentScore = parseFloat(sessionData[0].score) || 0;
      const updatedScore = parseFloat(
        (currentScore - userTestScore).toFixed(6)
      );

      await userSessionService.updateOne(user_session_id, {
        score: updatedScore,
      });

      logger.info(
        `Score updated successfully for user_session_test ID ${user_session_id}`
      );
    }

    return keys;
  });

  action(
    "user_session_test.items.update",
    async ({ keys, payload, collection }, { database, accountability }) => {
      // logger.info(payload);
      if (!payload.trigger_calculate_score) {
        logger.info("calculate score not triggered");
        return;
      }
      logger.info("calculate score triggered");
      const schema = await getSchema();
      for (const user_session_id of keys) {
        logger.info(user_session_id);
        try {
          const userTestService = new ItemsService("user_test", {
            schema: schema,
          });
          const userSessionService = new ItemsService("user_session_test", {
            schema: schema,
          });

          // Fetch all answers for the user session
          const userAnswers = await userTestService.readByQuery({
            filter: { user_session_id: user_session_id },
            fields: ["score_category", "score", "correct_score"],
            limit: -1,
          });

          // Peserta yang belum menjawab apa pun tetap harus bisa mengakhiri ujian
          // supaya `end_attempt_at` terisi. Skornya dihitung apa adanya, yaitu 0.

          // Calculate score summary
          let correctAnswers = 0;
          let incorrectAnswers = 0;
          let unanswered = 0;
          let totalScore = 0;
          let maxScore = 0;

          userAnswers.forEach((answer) => {
            if (answer.score_category === 1) correctAnswers += 1;
            else if (answer.score_category === -1) incorrectAnswers += 1;
            else unanswered += 1;
            totalScore += parseFloat(answer.score) || 0;
            maxScore += parseFloat(answer.correct_score) || 0;
          });

          totalScore = parseFloat(totalScore.toFixed(6));
          maxScore = parseFloat(maxScore.toFixed(6));

          await userSessionService.updateOne(user_session_id, {
            trigger_calculate_score: false,
            score: totalScore,
            max_score: maxScore,
            score_summary: JSON.stringify({
              correct_answers: correctAnswers,
              wrong_answers: incorrectAnswers,
              not_answers: unanswered,
            }),
          });
        } catch (error) {
          logger.error(`Failed calculate score : ` + error);
        }
      }
    }
  );
};
