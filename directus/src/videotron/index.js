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
              ust.score
          FROM 
              user_session_test ust
          JOIN 
              coupon c ON ust.info_peserta = c.id
          WHERE 
              ust."session" = ?
          ORDER BY 
              ust.score DESC NULLS LAST
        `, [id]);
  
        const rows = results?.[0] || results?.rows || results;
  
        if (!rows || rows.length === 0) {
          return res.status(404).json({
            status: 'error',
            message: 'No session results found.',
          });
        }
  

        res.status(200).json({
          status: 'success',
          data: rows,
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
  