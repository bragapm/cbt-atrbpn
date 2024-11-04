export default function registerEndpoint(router, { database, logger }) {
    router.get('/', async (req, res) => {
        try {
            // users
            const totalUsersResult = await database.raw(`
                SELECT COUNT(*) AS total_registered_users
                FROM directus_users du 
                WHERE du.role = '8e1fae70-492c-4579-8ccd-82f6dc39a770';
            `);
            const totalRegisteredUsers = totalUsersResult.rows || 0;

            // ongoing tests 
            const ongoingTestsResult = await database.raw(`
                SELECT COUNT(*) AS ongoing_tests 
                FROM session_test st 
                WHERE st.start_time <= CURRENT_TIMESTAMP AND st.end_time >= CURRENT_TIMESTAMP;
            `);
            const ongoingTests = ongoingTestsResult.rows || 0;

            // finished tests
            const finishedTestsResult = await database.raw(`
                SELECT COUNT(*) AS finished_tests 
                FROM session_test st 
                WHERE st.end_time < CURRENT_TIMESTAMP;
            `);
            const finishedTests = finishedTestsResult.rows || 0;

            // total questions
            const soalResult = await database.raw(`
                SELECT COUNT(*) AS jumlah_soal 
                FROM questions_bank qb;
            `);
            const jumlahSoal = soalResult.rows || 0;

            // questions per materi
            const soalPerKategoriResult = await database.raw(`
                SELECT qb.materi_id, ms.materi, COUNT(*) AS jumlah_soal
                FROM questions_bank qb
                JOIN materi_soal ms ON qb.materi_id = ms.id 
                GROUP BY qb.materi_id, ms.materi;
            `);
            const soalPerKategori = soalPerKategoriResult.rows || [];

            res.json({
                totalRegisteredUsers,
                ongoingTests,
                finishedTests,
                jumlahSoal,
                soalPerKategori
            });

        } catch (error) {
            logger.error("Error fetching metrics:", error);
            res.status(500).json({ error: "An error occurred while fetching metrics." });
        }
    });
}
