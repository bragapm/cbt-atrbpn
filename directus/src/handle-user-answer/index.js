export default ({ filter }, { database, services, logger }) => {
    const { ItemsService } = services;
  
    // hook for updating score when an answer is created in user_test
    filter("user_test.items.create", async (payload, _meta, { database, schema, accountability }) => {
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
  
      const userTestScore = questionOption.is_correct ? payload.score : 0;
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
  
      const currentScore = sessionData?.[0]?.score || 0;
      const updatedScore = currentScore + userTestScore;
  
      await userSessionService.updateOne(payload.user_session_id, { score: updatedScore });
  
      logger.info(`Score updated successfully for session ID ${payload.user_session_id}`);
      return payload;
    });
  
    // hook for updating score when answer is updated in user_test
    filter("user_test.items.update", async (payload, _meta, { database, schema, accountability }) => {
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
  
      const userTestScore = questionOption.is_correct ? payload.score : 0;
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
  
      const currentScore = sessionData?.[0]?.score || 0;
      const updatedScore = currentScore + userTestScore;
      
      await userSessionService.updateOne(payload.user_session_id, { score: updatedScore });
  
      logger.info(`Score updated successfully for session ID ${payload.user_session_id}`);
      return payload;
    });
  };
  