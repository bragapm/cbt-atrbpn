// Endpoint jawaban peserta
export default function registerEndpoint(router, { database, logger }) {
    router.get('/', async (req, res) => {
      try {
        const { user_session_id } = req.query;
  
        if (!user_session_id) {
          return res.status(400).json({
            success: false,
            error: 'Missing required parameter: user_session_id',
            debug: {
              query_params: req.query,
            },
          });
        }
  
        const query = `
        WITH assigned_problems AS (
            SELECT json_array_elements_text(problems)::INTEGER AS problem_id
            FROM user_session_test
            WHERE id = ?
        ),
        answered_problems AS (
            SELECT problem, 
                    score::NUMERIC, 
                    score_category::INTEGER
            FROM user_test
            WHERE user_session_id = ?
        ),
        unanswered_problems AS (
            SELECT ap.problem_id
            FROM assigned_problems ap
            LEFT JOIN answered_problems ans ON ap.problem_id = ans.problem
            WHERE ans.problem IS NULL
            )
        SELECT 
            qb.id AS "id",
            qb.question AS "soal_pertanyaan",
            COALESCE(ans.score_category, 0::INTEGER) AS "jawaban",
            ks.nama_kategori AS "kategori",
            COALESCE(ans.score, 0::NUMERIC) AS "skor",
            COALESCE(ks.bobot_benar, 0::NUMERIC) AS "nilai_jawaban_benar",
            ms.materi AS "materi"
        FROM assigned_problems ap
        LEFT JOIN answered_problems ans ON ap.problem_id = ans.problem
        LEFT JOIN questions_bank qb ON ap.problem_id = qb.id
        LEFT JOIN kategori_soal ks ON qb.kategori_id = ks.id
        LEFT JOIN materi_soal ms ON qb.materi_id = ms.id;
    `;
  
        const result = await database.raw(query, [user_session_id, user_session_id]);
        const rows = result.rows || [];
        const count = rows.length; 

        res.json({
        success: true,
        data: rows,
        count: count, 
        });

      } catch (error) {
        logger.error('Error fetching user answers:', error);
        res.status(500).json({
          success: false,
          error: 'An error occurred while processing your request.',
          message: error.message,
          debug: {
            query,
            bindings: [user_session_id, user_session_id],
            raw_error: error,
          },
        });
      }
    });
  }
  