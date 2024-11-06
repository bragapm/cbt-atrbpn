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
            avgScoreByDateQuery += `GROUP BY DATE(start_attempt_at)`;

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
                    st.id AS session,
                    st.name AS session_name,
                    DATE(ust.start_attempt_at) AS date,
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
                GROUP BY DATE(ust.start_attempt_at), st.name, st.id`;

            const avgScoreBySessionResult = await database.raw(avgScoreBySessionQuery, date ? [date] : []);
            console.log(avgScoreBySessionResult);
            const avgScoreBySession = avgScoreBySessionResult.rows.map(row => ({
                session_name: row.session_name,
                date: row.date,
                session: row.session,
                average_score: parseFloat(row.average_score)
            }));

            const overallAverageScore = avgScoreBySession.reduce((sum, row) => sum + row.average_score, 0) / avgScoreBySession.length;

            res.json({
                averageScoreBySession: avgScoreBySession,
                overallAverageScore: avgScoreBySession.length > 0 ? overallAverageScore : 0 
            });

        } catch (error) {
            logger.error("Error fetching average scores by session:", error);
            res.status(500).json({ error: "An error occurred while fetching average scores by session." });
        }
    });

    router.get('/all', async (req, res) => {
        const { date } = req.query;
        try {

            let avgScoreQuery = `
                SELECT 
                AVG(score) AS average_score
                FROM 
                user_session_test
                `;
            const avgScoreResult = await database.raw(avgScoreQuery, date ? [date] : []);
            const avgScore = avgScoreResult.rows.map(row => ({
                average_score: parseFloat(row.average_score)
            }));

            res.json({
                averageScore: avgScore
            });

        } catch (error) {
            logger.error("Error fetching average scores by date:", error);
            res.status(500).json({ error: "An error occurred while fetching average scores by date." });
        }
    });
}



