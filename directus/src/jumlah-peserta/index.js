// Endpoint jumlah peserta per sesi pake pagination
export default function registerEndpoint(router, { database, logger }) {
    router.get('/', async (req, res) => {
        try {
            const { limit = 10, page = 1 } = req.query;
            
            const offset = (page - 1) * limit;

            
        const query = `
            SELECT 
                st.id AS session_id,
                st.name AS "nama",
                DATE(st.start_time) AS "tanggal_ujian",
                st.start_time::TIME AS "mulai_ujian",
                st.end_time::TIME AS "selesai_ujian",
                COUNT(ust.session) AS "jumlah_peserta",
                st.login_start::TIME AS "login_start"
            FROM 
                session_test st
            LEFT JOIN 
                user_session_test ust 
            ON 
                st.id = ust.session 
            GROUP BY 
                st.id, st.name, st.start_time, st.end_time, st.login_start 
            ORDER BY 
                st.id ASC
            LIMIT ? OFFSET ?;
        `;
        
            // total number of rows
            const countQuery = `
                SELECT 
                    COUNT(*) AS total 
                FROM 
                    session_test st
            `;

            
            const [result, countResult] = await Promise.all([
                database.raw(query, [limit, offset]),
                database.raw(countQuery)
            ]);

            const rows = result.rows || [];
            const totalCount = countResult.rows[0]?.total || 0;

            res.json({
                success: true,
                data: rows,
                meta: {
                    page: Number(page),
                    limit: Number(limit),
                    totalCount: Number(totalCount), // total count
                    totalPages: Math.ceil(totalCount / limit), //  total pages
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
