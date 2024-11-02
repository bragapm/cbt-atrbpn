
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { writeXLSX, utils } from "xlsx";

export const generateAndPipeSpreadsheet = async (result, res, filename, logger) => {
  const workbook = utils.book_new();
  const worksheet = utils.json_to_sheet(result);
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const xlsxBuf = writeXLSX(workbook, { type: "buffer" });
  const readable = new Readable();
  readable.push(xlsxBuf);
  readable.push(null);

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}.xlsx"`);
  try {
    await pipeline(readable, res);
  } catch (error) {
    logger.error(error);
  }
};
