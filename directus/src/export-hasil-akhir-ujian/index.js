import { generateAndPipeSpreadsheet } from "../../utils/generate_spreadsheet.js";
export default function registerEndpoint(
  router,
  { database, exceptions, logger }
) {
  router.get("/", async (req, res, next) => {
    try {
      const { rows } = await database.raw(`
		SELECT
			c.code, c.nama_peserta, st."name" AS nama_sesi,
			ust.score, ust.feedback
		FROM user_session_test ust
		LEFT JOIN coupon c ON ust.info_peserta = c.id
		LEFT JOIN session_test st ON ust."session" = st.id
		ORDER BY c.nama_peserta;`);

      await generateAndPipeSpreadsheet(rows, res, "hasil_akhir_ujian", logger);
    } catch (error) {
      logger.error("Error occurred: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    }
  });
}
