export default function registerEndpoint(router, { database, logger }) {
    router.get('/upcoming', async (req, res) => {
        try {

        // Query for ALL tests today
            const todayTestsResult = await database.raw(`
                SELECT 
                count(*)
            FROM 
                session_test st
            WHERE 
                DATE(st.start_time) = CURRENT_DATE
                AND DATE(st.end_time) = CURRENT_DATE;
            `);
            const todayTests = todayTestsResult.rows[0]?.count.toString() || "0";

            // Query for ONGOING tests today
            // const todayTestsResult = await database.raw(`
            //     SELECT COUNT(*) AS today_tests
            //     FROM session_test st
            //     WHERE 
            //         DATE(st.start_time) = CURRENT_DATE
            //         AND st.start_time <= CURRENT_TIMESTAMP 
            //         AND st.end_time >= CURRENT_TIMESTAMP;
            // `);
            // const todayTests = todayTestsResult.rows[0]?.today_tests || 0;


            // Query for ALL tests this week

            const thisWeekTestsResult = await database.raw(`
                SELECT 
                    count(*)
                FROM 
                    session_test st
                WHERE 
                    DATE_PART('week', st.start_time) = DATE_PART('week', CURRENT_DATE)
                    AND DATE_PART('year', st.start_time) = DATE_PART('year', CURRENT_DATE);
            `);
            const thisWeekTests = thisWeekTestsResult.rows[0]?.count.toString() || "0";
    
            // // Query for ONGOING tests this week
            // const thisWeekTestsResult = await database.raw(`
            //     SELECT COUNT(*) AS this_week_tests
            //     FROM session_test st
            //     WHERE 
            //         DATE_PART('week', st.start_time) = DATE_PART('week', CURRENT_DATE)
            //         AND DATE_PART('year', st.start_time) = DATE_PART('year', CURRENT_DATE)
            //         AND st.start_time <= CURRENT_TIMESTAMP 
            //         AND st.end_time >= CURRENT_TIMESTAMP;
            // `);
            // const thisWeekTests = thisWeekTestsResult.rows[0]?.this_week_tests || 0;

            // // Query for ongoing tests this month
            // const thisMonthTestsResult = await database.raw(`
            //     SELECT COUNT(*) AS this_month_tests
            //     FROM session_test st
            //     WHERE 
            //         DATE_PART('month', st.start_time) = DATE_PART('month', CURRENT_DATE)
            //         AND DATE_PART('year', st.start_time) = DATE_PART('year', CURRENT_DATE)
            //         AND st.start_time <= CURRENT_TIMESTAMP 
            //         AND st.end_time >= CURRENT_TIMESTAMP;
            // `);
            // const thisMonthTests = thisMonthTestsResult.rows[0]?.this_month_tests || 0;

            res.json({
                todayTests,
                thisWeekTests,
                //thisMonthTests,
            });

        } catch (error) {
            logger.error("Error fetching ongoing tests metrics:", error);
            res.status(500).json({ error: "An error occurred while fetching ongoing tests metrics." });
        }
    });

    router.get('/count', async (req, res) => {
        try {
            //   count COMPLETED tests
            const completedTestsResult = await database.raw(`
                SELECT COUNT(*) AS completed_tests
                FROM session_test st
                WHERE st.end_time < CURRENT_TIMESTAMP;
            `);
            const completedTests = completedTestsResult.rows[0]?.completed_tests || 0;

            //  count non-completed (ongoing or upcoming) tests
            const nonCompletedTestsResult = await database.raw(`
                SELECT COUNT(*) AS non_completed_tests
                FROM session_test st
                WHERE st.end_time >= CURRENT_TIMESTAMP;
            `);
            const nonCompletedTests = nonCompletedTestsResult.rows[0]?.non_completed_tests || 0;

            res.json({
                completedTests,
                nonCompletedTests,
            });

        } catch (error) {
            logger.error("Error fetching test status counts:", error);
            res.status(500).json({ error: "An error occurred while fetching test status counts." });
        }
    });
}
