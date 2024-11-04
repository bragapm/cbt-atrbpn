//endpoint metric pertnyaan dengan detail kategori (jawab benar/salah/tidak jawab)

export default function registerEndpoint(router, { database, logger }) {
    router.get('/', async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;
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
                    qb.id, qb.question
                LIMIT ?
                OFFSET ?;
            `, [parseInt(limit, 10), parseInt(offset, 10)]);

            // total jumlah records 
            const totalRecordsResult = await database.raw(`
                SELECT COUNT(DISTINCT qb.id) AS total
                FROM questions_bank qb
                LEFT JOIN user_test ut ON qb.id = ut.problem;
            `);
            const totalRecords = totalRecordsResult.rows[0]?.total || 0;

            const totalPages = Math.ceil(totalRecords / limit);

            res.json({
                data: metricSoal.rows,
                pagination: {
                    totalRecords,
                    totalPages,
                    currentPage: parseInt(page, 10),
                    limit: parseInt(limit, 10)
                }
            });

        } catch (error) {
            logger.error("Error fetching metrics:", error);
            res.status(500).json({ error: "An error occurred while fetching metrics." });
        }
    });
}
