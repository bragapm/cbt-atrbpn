import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { writeXLSX, utils } from "xlsx";
import { generateAndPipeSpreadsheet } from "../../utils/generate_spreadsheet.js";
export default function registerEndpoint(
  router,
  { database, exceptions, logger }
) {
  router.get("/", async (req, res, next) => {
    try {
      const result = await database.raw(`
        SELECT
          qb.id, ms.materi, ks.nama_kategori AS kategori,
          qb.question AS pertanyaan, qb.random_question, qb.random_options,
          -- Option A (Order 1)
          MAX(CASE WHEN qo."order" = 1 THEN qo.option_text END) AS option_a,
          MAX(CASE WHEN qo."order" = 1 THEN qo.option_image::text END) AS option_a_image,
          -- Option B (Order 2)
          MAX(CASE WHEN qo."order" = 2 THEN qo.option_text END) AS option_b,
          MAX(CASE WHEN qo."order" = 2 THEN qo.option_image::text END) AS option_b_image,
          -- Option C (Order 3)
          MAX(CASE WHEN qo."order" = 3 THEN qo.option_text END) AS option_c,
          MAX(CASE WHEN qo."order" = 3 THEN qo.option_image::text END) AS option_c_image,
          -- Option D (Order 4)
          MAX(CASE WHEN qo."order" = 4 THEN qo.option_text END) AS option_d,
          MAX(CASE WHEN qo."order" = 4 THEN qo.option_image::text END) AS option_d_image,
          -- Option E (Order 5)
          MAX(CASE WHEN qo."order" = 5 THEN qo.option_text END) AS option_e,
          MAX(CASE WHEN qo."order" = 5 THEN qo.option_image::text END) AS option_e_image,
          -- Mapping Correct Answer (Menampilkan label A, B, C, D, atau E)
          MAX(CASE 
              WHEN qo.is_correct = true AND qo."order" = 1 THEN 'A'
              WHEN qo.is_correct = true AND qo."order" = 2 THEN 'B'
              WHEN qo.is_correct = true AND qo."order" = 3 THEN 'C'
              WHEN qo.is_correct = true AND qo."order" = 4 THEN 'D'
              WHEN qo.is_correct = true AND qo."order" = 5 THEN 'E'
          END) AS correct_answer
        FROM questions_bank qb
        JOIN materi_soal ms ON ms.id = qb.materi_id
        JOIN kategori_soal ks ON ks.id = qb.kategori_id
        LEFT JOIN question_options qo ON qb.id = qo.question_id
        GROUP BY qb.id, ms.materi, ks.nama_kategori, qb.question, qb.random_question, qb.random_options;`);
      const rows = result[0] || result.rows || result;
      // console.log(rows);
      await generateAndPipeSpreadsheet(rows, res, "pertanyaan", logger);
    } catch (error) {
      logger.error("Error occurred:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    }
  });
}
