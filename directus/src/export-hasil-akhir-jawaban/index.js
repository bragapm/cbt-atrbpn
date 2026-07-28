import { generateAndPipeSpreadsheet } from "../../utils/generate_spreadsheet.js";
export default function registerEndpoint(
  router,
  { database, exceptions, logger }
) {
  router.get("/", async (req, res, next) => {
    try {
      const { rows } = await database.raw(`
		SELECT
			qb.id AS question_id,
			qb.question AS soal_pertanyaan,
			COUNT(CASE WHEN ut.score_category = 1 THEN 1 END) AS jawaban_benar,
			COUNT(CASE WHEN ut.score_category = -1 THEN 1 END) AS jawaban_salah,
			COUNT(CASE WHEN ut.score_category = 0 THEN 1 END) AS tidak_menjawab
		FROM questions_bank qb
		LEFT JOIN user_test ut ON qb.id = ut.problem
		GROUP BY qb.id, qb.question
		ORDER BY qb.id;`);

      await generateAndPipeSpreadsheet(
        rows,
        res,
        "hasil_akhir_jawaban",
        logger
      );
    } catch (error) {
      logger.error("Error occurred: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    }
  });
}
