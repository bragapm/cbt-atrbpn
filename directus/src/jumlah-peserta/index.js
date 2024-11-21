// Endpoint jumlah peserta per sesi pake pagination
export default function registerEndpoint(router, { database, logger }) {
    router.get('/', async (req, res) => {
        try {
            const { limit = 10, page = 1 } = req.query;
            
            const offset = (page - 1) * limit;

            const query = `
                SELECT 
                    session AS session_id,
                    st.name  AS "Nama",
                    DATE(st.start_time) as "Tanggal Ujian",
                    st.start_time::TIME AS "Mulai Ujian",
                    st.end_time::TIME as "Selesai Ujian",
                    COUNT(*) AS "Jumlah Peserta"
                FROM 
                    user_session_test ust
                JOIN 
                    session_test st 
                ON 
                    st.id = ust."session" 
                GROUP BY 
                    session, st.name, st.start_time, st.end_time 
                ORDER BY 
                    session ASC
                LIMIT ? OFFSET ?;
            `;

            const result = await database.raw(query, [limit, offset]);
            const rows = result.rows || [];

            res.json({
                success: true,
                data: rows,
                meta: {
                    page: Number(page),
                    limit: Number(limit),
                },
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
