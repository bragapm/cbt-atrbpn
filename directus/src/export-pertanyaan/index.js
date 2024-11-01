import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { writeXLSX, utils } from "xlsx";
import { generateAndPipeSpreadsheet } from "../../utils/generate_spreadsheet.js";
export default function registerEndpoint(router, { database, exceptions, logger }) {
    router.get('/', async (req, res, next) => {
      try {
        const result = await database.raw(`
            select ms.materi ,ks.nama_kategori AS kategori, question as pertanyaan from questions_bank qb 
            join materi_soal ms on  ms.id = qb.materi_id
            join kategori_soal ks on ks.id = qb.kategori_id 
        `);
        const rows = result[0] || result.rows || result;
        // console.log(rows);
        await generateAndPipeSpreadsheet(rows, res, 'pertanyaan', logger);
  
      } catch (error) {
        logger.error("Error occurred:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
      }
    });
  }






