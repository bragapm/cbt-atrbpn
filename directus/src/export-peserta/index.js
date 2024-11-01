import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { writeXLSX, utils } from "xlsx";

export default function registerEndpoint(router, { database, exceptions, logger }) {
    router.get('/', async (req, res, next) => {
      try {
        const result = await database.raw(`
          SELECT code, nama_peserta, nomor_kontak, session 
          FROM user_session_test st 
          JOIN coupon c ON st.info_peserta = c.id
        `);
        const rows = result[0] || result.rows || result;
        // console.log(rows);
        await generateAndPipeSpreadsheet(rows, res, 'user_info', logger);
  
      } catch (error) {
        logger.error("Error occurred:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
      }
    });
  }

const generateAndPipeSpreadsheet = async (result, res, filename, logger) => {
  const workbook = utils.book_new();
  const worksheet = utils.json_to_sheet(result);
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const xlsxBuf = writeXLSX(workbook, { type: "buffer" });
  const readable = new Readable();
  readable.push(xlsxBuf);
  readable.push(null);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}.xlsx"`
  );
  try {
    await pipeline(readable, res);
  } catch (error) {
    logger.error(error);
  }
};
