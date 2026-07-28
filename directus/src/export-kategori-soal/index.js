import { generateAndPipeSpreadsheet } from "../../utils/generate_spreadsheet.js";
export default function registerEndpoint(
  router,
  { database, exceptions, logger }
) {
  router.get("/", async (req, res, next) => {
    try {
      const { rows } = await database.raw(`
		SELECT nama_kategori, bobot_benar, bobot_salah, tidak_menjawab
		FROM kategori_soal
		ORDER BY nama_kategori;`);

      await generateAndPipeSpreadsheet(rows, res, "kategori_soal", logger);
    } catch (error) {
      logger.error("Error occurred: " + error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    }
  });
}
