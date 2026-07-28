
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { writeXLSX, utils } from "xlsx";

const DEFAULT_DECIMAL_KEYS = ["score"];
const DEFAULT_DECIMAL_PLACES = 6;

// Postgres mengirim kolom numeric sebagai string, sehingga json_to_sheet menulisnya
// sebagai teks. Kolom pada decimalKeys dipaksa jadi cell angka + number format,
// supaya di Excel tampil dengan jumlah desimal yang tetap (default 6).
const applyDecimalFormat = (worksheet, decimalKeys, decimalPlaces) => {
  if (!worksheet["!ref"] || decimalKeys.length === 0) return;

  const numFmt = decimalPlaces > 0 ? `0.${"0".repeat(decimalPlaces)}` : "0";
  const targets = decimalKeys.map((key) => String(key).toLowerCase());
  const range = utils.decode_range(worksheet["!ref"]);

  for (let col = range.s.c; col <= range.e.c; col++) {
    const headerCell = worksheet[utils.encode_cell({ r: range.s.r, c: col })];
    const header = headerCell ? String(headerCell.v).toLowerCase() : "";
    if (!targets.includes(header)) continue;

    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const cell = worksheet[utils.encode_cell({ r: row, c: col })];
      if (!cell || cell.v === null || cell.v === undefined || cell.v === "") continue;

      const value = Number(cell.v);
      if (Number.isNaN(value)) continue;

      cell.t = "n";
      cell.v = value;
      cell.z = numFmt;
      delete cell.w;
    }
  }
};

export const generateAndPipeSpreadsheet = async (
  result,
  res,
  filename,
  logger,
  { decimalKeys = DEFAULT_DECIMAL_KEYS, decimalPlaces = DEFAULT_DECIMAL_PLACES } = {}
) => {
  const workbook = utils.book_new();
  const worksheet = utils.json_to_sheet(result);
  applyDecimalFormat(worksheet, decimalKeys, decimalPlaces);
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const xlsxBuf = writeXLSX(workbook, { type: "buffer", cellStyles: true });
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
