//semua soal group by materi
export default function registerEndpoint(router, { database, logger }) {
    router.get('/', async (req, res) => {
        try {
            const soalPerKategoriResult = await database.raw(`
                SELECT qb.materi_id, ms.materi, COUNT(*) AS jumlah_soal
                FROM questions_bank qb
                JOIN materi_soal ms ON qb.materi_id = ms.id 
                GROUP BY qb.materi_id, ms.materi;
            `);
            const soalPerKategori = soalPerKategoriResult.rows || [];
            res.json({
                soalPerKategori
            });

        } catch (error) {
            logger.error("Error fetching metrics:", error);
            res.status(500).json({ error: "An error occurred while fetching metrics." });
        }
    });
}
