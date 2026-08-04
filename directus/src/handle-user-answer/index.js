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
      if (!payload.answer) {
        throw new Error("Invalid payload: Missing answer");
      }

      const questionOption = await database("question_options")
        .where({ id: payload.answer })
        .select("is_correct")
        .first();

      if (!questionOption) {
        logger.warn("Answer not found in question_options");
        return payload;
      }

      // score_category: 1 benar, -1 salah. Status baru dipakai dari payload
      // kalau dikirim, kalau tidak diturunkan dari jawaban yang baru.
      const nextCategory =
        payload.score_category !== undefined
          ? Number(payload.score_category)
          : questionOption.is_correct
            ? 1
            : -1;
      const payloadScore =
        payload.score !== undefined ? Number(payload.score) || 0 : undefined;

      const userSessionService = new ItemsService("user_session_test", {
        knex: database,
        accountability: null,
        schema,
      });

      for (const key of keys) {
        // Filter berjalan sebelum data ditulis, jadi row ini masih berisi
        // status & skor lama.
        const row = await database("user_test")
          .select("user_session_id", "problem", "score", "score_category")
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

        let nextScore = payloadScore;
        if (nextScore === undefined) {
          // Bobot skor ada di `kategori_soal`, bukan di `question_options`.
          // Dijangkau lewat user_test.problem -> questions_bank.kategori_id.
          const category = await database("questions_bank as qb")
            .join("kategori_soal as ks", "ks.id", "qb.kategori_id")
            .where("qb.id", row.problem)
            .select("ks.bobot_benar", "ks.bobot_salah")
            .first();

          if (!category) {
            logger.warn(
              `Kategori soal for user_test ID ${key} not found, score update skipped`
            );
            continue;
          }

          nextScore =
            parseFloat(
              nextCategory === 1 ? category.bobot_benar : category.bobot_salah
            ) || 0;
        }

        // Salah -> benar: tambahkan skor jawaban yang baru.
        // Benar -> salah: kembalikan skor jawaban lama yang sudah terhitung.
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
