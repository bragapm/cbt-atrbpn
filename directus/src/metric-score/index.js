export default function registerEndpoint(router, { database, logger }) {
    
    //  Average score grouped by date
    router.get('/by-date', async (req, res) => {
        const { date } = req.query;

        try {
            //optional date filter
            let avgScoreByDateQuery = `
                SELECT 
                    DATE(start_attempt_at) AS date,
                    AVG(score) AS average_score
                FROM 
                    user_session_test
            `;
            if (date) {
                avgScoreByDateQuery += ` WHERE DATE(start_attempt_at) = ? `;
            }
            avgScoreByDateQuery += `GROUP BY DATE(start_attempt_at) ORDER BY date;`;

            const avgScoreByDateResult = await database.raw(avgScoreByDateQuery, date ? [date] : []);
            const avgScoreByDate = avgScoreByDateResult.rows.map(row => ({
                date: row.date,
                average_score: parseFloat(row.average_score)
            }));

            res.json({
                averageScoreByDate: avgScoreByDate
            });

        } catch (error) {
            logger.error("Error fetching average scores by date:", error);
            res.status(500).json({ error: "An error occurred while fetching average scores by date." });
        }
    });

    // Average score grouped by session per hari
    router.get('/by-session', async (req, res) => {
        const { date } = req.query;

        try {
            // optional date filter
            let avgScoreBySessionQuery = `
                SELECT 
                    DATE(ust.start_attempt_at) AS date,
                    st.id as session,
                    st.name,
                    AVG(ust.score) AS average_score
                FROM 
                    user_session_test ust 
                JOIN 
                    session_test st ON ust.session = st.id
            `;
            if (date) {
                avgScoreBySessionQuery += ` WHERE DATE(ust.start_attempt_at) = ? `;
            }
            avgScoreBySessionQuery += `
                GROUP BY DATE(ust.start_attempt_at), st.name, st.id

            `;

            const avgScoreBySessionResult = await database.raw(avgScoreBySessionQuery, date ? [date] : []);
            const avgScoreBySession = avgScoreBySessionResult.rows.map(row => ({
                date: row.date,
                session: row.session,
                average_score: parseFloat(row.average_score)
            }));

            res.json({
                averageScoreBySession: avgScoreBySession
            });

        } catch (error) {
            logger.error("Error fetching average scores by session:", error);
            res.status(500).json({ error: "An error occurred while fetching average scores by session." });
        }
    });
}