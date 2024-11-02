import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { writeXLSX, utils } from "xlsx";
import { generateAndPipeSpreadsheet } from "../../utils/generate_spreadsheet.js";

export default function registerEndpoint(router, { database, exceptions, logger }) {
    router.get('/', async (req, res, next) => {
        const { id_peserta: idPeserta } = req.query;

        try {
            const result = await database.raw(`
            SELECT 
                cp.nama_peserta as nama_peserta ,
                qb.question AS "Soal Pertanyaan", 
                CASE 
                    WHEN qo.is_correct = TRUE THEN 'Benar'
                    ELSE 'Salah'
                END AS "Jawaban", 
                ks.nama_kategori AS "Kategori Soal", 
                ms.materi AS "Materi Soal" 
            FROM user_test ut
            JOIN questions_bank qb ON ut.problem = qb.id 
            JOIN materi_soal ms ON qb.materi_id = ms.id 
            JOIN kategori_soal ks ON qb.kategori_id = ks.id
            JOIN question_options qo ON qo.question_id = qb.id
            JOIN coupon cp on cp.user_id = ut.user 
            WHERE ut."user" = ?;
            `, [idPeserta]); 

            const rows = result[0] || result.rows || result;
            await generateAndPipeSpreadsheet(rows, res, 'hasil_peserta', logger);

        } catch (error) {
            logger.error("Error occurred:", error);
            res.status(500).json({ error: "An error occurred while processing your request." });
        }
    });
}
