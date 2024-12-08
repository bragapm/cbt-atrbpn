export default function registerEndpoint(router, { database, logger }) {
    router.get('/', async (req, res) => {
        try {
            // users
            const totalUsersResult = await database.raw(`
                SELECT COUNT(*) AS total_registered_users
                FROM coupon c; 
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

            res.json({
                totalRegisteredUsers,
                ongoingTests,
                finishedTests,
            });

        } catch (error) {
            logger.error("Error fetching metrics:", error);
            res.status(500).json({ error: "An error occurred while fetching metrics." });
        }
    });
}
