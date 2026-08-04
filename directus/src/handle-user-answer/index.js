export default (
  { filter, action },
  { database, services, logger, getSchema }
) => {
  const { ItemsService } = services;

  // hook for updating score when an answer is created in user_test
  filter(
    "user_test.items.create",
    async (payload, _meta, { database, schema, accountability }) => {
      console.log("user_test created");
      if (!payload.answer || !payload.user_session_id) {
        throw new Error("Invalid payload: Missing answer or user_session_id");
      }

      const questionOption = await database("question_options")
        .where({ id: payload.answer })
        .select("is_correct")
        .first();

      if (!questionOption) {
        logger.warn("Answer not found in question_options");
        return payload;
      }

      const userTestScore = questionOption.is_correct
        ? parseFloat(payload.score) || 0
        : 0;
      const userSessionService = new ItemsService("user_session_test", {
        knex: database,
        accountability,
        schema,
      });

      const sessionData = await userSessionService.readByQuery({
        filter: {
          id: payload.user_session_id,
        },
        fields: ["score"],
        limit: 1,
      });

      const currentScore = parseFloat(sessionData?.[0]?.score) || 0;
      const updatedScore = currentScore + userTestScore;

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
    async (payload, _meta, { database, schema, accountability }) => {
      console.log("user_test updated");
      if (!payload.answer || !payload.user_session_id) {
        throw new Error("Invalid payload: Missing answer or user_session_id");
      }

      const questionOption = await database("question_options")
        .where({ id: payload.answer })
        .select("is_correct")
        .first();

      if (!questionOption) {
        logger.warn("Answer not found in question_options");
        return payload;
      }

      const userTestScore = questionOption.is_correct
        ? parseFloat(payload.score) || 0
        : 0;
      const userSessionService = new ItemsService("user_session_test", {
        knex: database,
        accountability,
        schema,
      });

      const sessionData = await userSessionService.readByQuery({
        filter: {
          id: payload.user_session_id,
        },
        fields: ["score"],
        limit: 1,
      });

      const currentScore = parseFloat(sessionData?.[0]?.score) || 0;
      const updatedScore = currentScore + userTestScore;

      await userSessionService.updateOne(payload.user_session_id, {
        score: updatedScore,
      });

      logger.info(
        `Score updated successfully for user_session_test ID ${payload.user_session_id}`
      );
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
