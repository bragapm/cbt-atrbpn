
// Endpoint soal per materi with optional filter
export default function registerEndpoint(router, { database, exceptions, logger }) {
    router.get('/', async (req, res, next) => {
        const { materi_id } = req.query; 
        try {

            let query = `
                SELECT 
                    qb.materi_id,
                    ms.materi,
                    COUNT(*) AS jumlah_soal
                FROM 
                    questions_bank qb
                JOIN 
                    materi_soal ms ON qb.materi_id = ms.id
                JOIN 
                    kategori_soal ks ON qb.kategori_id = ks.id
            `;
            if (materi_id) {
                query += ` WHERE ms.id = ?`;
            }
            query += ` GROUP BY qb.materi_id, ms.materi;`;

            const result = await database.raw(query, materi_id ? [materi_id] : []);
            const rows = result.rows || [];
            res.json({
                data: rows
            });

        } catch (error) {
            logger.error("Error occurred:", error);
            res.status(500).json({ error: "An error occurred while processing your request." });
        }
    });
}
