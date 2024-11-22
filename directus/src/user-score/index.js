export default function registerEndpoint(router, { database, exceptions, logger }) {
    router.get('/max-score/:sessionId', async (req, res, next) => {
        try {
            const { sessionId } = req.params;
            logger.info(`Session ID: ${sessionId}`);

            // 1. fetch problems array
            const sessionData = await database.raw(`
                SELECT problems, score
                FROM user_session_test
                WHERE id = ?
            `, [sessionId]);

            if (!sessionData.rows.length) {
                return res.status(404).json({ error: "Session not found." });
            }

            const { problems, score } = sessionData.rows[0];

            // Validate
            if (!Array.isArray(problems) || problems.length === 0) {
                return res.json({ maxScore: 0, score });
            }

            //logger.info(`Problems array: ${problems}`);

            // psql-friendly format
            const problemsAsString = `{${problems.join(',')}}`;

            // Calculate skor maksimal
            const result = await database.raw(`
                SELECT SUM(ks.bobot_benar) AS max_score
                FROM questions_bank qb
                JOIN question_options qo ON qb.id = qo.question_id
                JOIN kategori_soal ks ON qb.kategori_id = ks.id
                WHERE qb.id = ANY(?::int[]) AND qo.is_correct = true;
            `, [problemsAsString]);

            const maxScore = result.rows[0]?.max_score || 0;

            res.json({ maxScore, score });
        } catch (error) {
            logger.error("Error calculating max score:", error);
            res.status(500).json({ error: "An error occurred while processing your request." });
        }
    });
}
