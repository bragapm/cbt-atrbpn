export default function registerEndpoint(router, { database, exceptions, logger }) {
    router.get('/get-session-results/:id', async (req, res) => {
      const { id } = req.params;

      // Validate 
      if (!id) {
        return res.status(400).json({
          status: 'error',
          message: 'Session ID is required.',
        });
      }

      try {
        const results = await database.raw(`
          SELECT 
              c.code AS id_peserta,
              c.nama_peserta,
              ust.score,
              ust.score_alias,
              ust.end_attempt_at
          FROM 
              user_session_test ust
          JOIN 
              coupon c ON ust.info_peserta = c.id
          WHERE 
              ust."session" = ?
          ORDER BY 
              c.nama_peserta
        `, [id]);

        const rows = results?.[0] || results?.rows || results;

        if (!rows || rows.length === 0) {
          return res.status(404).json({
            status: 'error',
            message: 'No session results found.',
          });
        }

        const processedRows = rows.map(row => ({
          id_peserta: row.id_peserta,
          nama_peserta: row.nama_peserta,
          score: row.score_alias !== null ? row.score_alias : row.score, 
        }));

        res.status(200).json({
          status: 'success',
          data: processedRows,
        });
      } catch (error) {
        logger.error(`Error fetching session results for ID ${id}:`, error);
        res.status(500).json({
          status: 'error',
          message: 'An error occurred while processing your request.',
        });
      }
    });
}
