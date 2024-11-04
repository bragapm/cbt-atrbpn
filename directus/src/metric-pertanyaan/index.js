export default function registerEndpoint(router, { database, logger }) {
    router.get('/', async (req, res) => {
        try {
            const metricSoal = await database.raw(`
                SELECT 
                    qb.id AS question_id,
                    qb.question AS question_text,
                    COUNT(CASE WHEN ut.score_category = 1 THEN 1 END) AS correct_count,
                    COUNT(CASE WHEN ut.score_category = 0 THEN 1 END) AS no_answer_count,
                    COUNT(CASE WHEN ut.score_category = -1 THEN 1 END) AS incorrect_count
                FROM 
                    questions_bank qb
                LEFT JOIN 
                    user_test ut ON qb.id = ut.problem 
                GROUP BY 
                    qb.id, qb.question;
            `);
            const totalMetricSoal = metricSoal.rows || 0;
            res.json({
                totalMetricSoal,
            });

        } catch (error) {
            logger.error("Error fetching metrics:", error);
            res.status(500).json({ error: "An error occurred while fetching metrics." });
        }
    });
}
