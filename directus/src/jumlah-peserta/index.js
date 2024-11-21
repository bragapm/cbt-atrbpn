
// Endpoint jumlah peserta per sesi
export default function registerEndpoint(router, { database, logger }) {
    router.get('/', async (req, res) => {
        try {  
            const query = `
                SELECT 
                    session AS session_id,
                    COUNT(*) AS user_count
                FROM 
                    user_session_test
                GROUP BY 
                    session
                ORDER BY 
                    session ASC;
            `;
            const result = await database.raw(query);
            const rows = result.rows || [];

            res.json({
                success: true,
                data: rows,
            });
        } catch (error) {
            logger.error('Error fetching user session test counts:', error);
            res.status(500).json({
                success: false,
                error: 'An error occurred while processing your request.',
            });
        }
    });
}


