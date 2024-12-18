import ExcelJS from 'exceljs';
import fileUpload from 'express-fileupload';
import { uploadImage } from '../../utils/uploadImage';

export default (router, { services, exceptions, getSchema }) => {
    const { ItemsService, FilesService } = services;
    router.use(fileUpload());  

    router.post('/', async (req, res) => {
        try {
            const file = req.files.file;
            if (!file) {
                return res.status(400).json({ status: 'error', message: 'No file uploaded' });
            }
    
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(file.data);
            const worksheet = workbook.getWorksheet(1);
            const schema = await getSchema();
            const questionService = new ItemsService('questions_bank', { schema });
            const optionService = new ItemsService('question_options', { schema });
            const materiService = new ItemsService('materi_soal', { schema });
            const kategoriService = new ItemsService('kategori_soal', { schema });
            const fileService = new FilesService({ schema });
    
            let questionCount = 0;
            const headerRow = worksheet.getRow(1);
            const headers = {};
            headerRow.eachCell((cell, colNumber) => {
                headers[cell.text.trim().toLowerCase()] = colNumber;
            });
    
            for (const row of worksheet.getRows(2, worksheet.rowCount - 1)) {
                const questionText = row.getCell(headers['question']).value;
                if (!questionText) break;
    
                const materiName = row.getCell(headers['material']).value;
                if (!materiName || typeof materiName !== 'string') {
                    throw new Error(`Invalid materiName: "${materiName}"`);
                }
    
                const kategoriName = row.getCell(headers['category']).value;
                if (!kategoriName || typeof kategoriName !== 'string') {
                    throw new Error(`Invalid kategoriName: "${kategoriName}"`);
                }
    
                const materiRecord = await materiService.readByQuery({
                    filter: { materi: { _icontains: materiName } },
                    limit: 1
                });
    
                if (!materiRecord || !materiRecord.length) {
                    throw new Error(`Materi "${materiName}" not found`);
                }
    
                const kategoriRecord = await kategoriService.readByQuery({
                    filter: { nama_kategori: { _eq: kategoriName } },
                    limit: 1
                });
    
                if (!kategoriRecord || !kategoriRecord.length) {
                    throw new Error(`Kategori "${kategoriName}" not found`);
                }
    
                const materi_id = materiRecord[0].id;
                const kategori_id = kategoriRecord[0].id;
    
                const randomQuestion = row.getCell(headers['random_question']).value === 'No';
                const randomOption = row.getCell(headers['random_option']).value === 'Yes';
    
                const newQuestion = await questionService.createOne({
                    question: questionText,
                    materi_id: materi_id,
                    kategori_id: kategori_id,
                    is_required: randomQuestion,
                    random_options: randomOption
                });
    
                const options = ['option_a', 'option_b', 'option_c', 'option_d', 'option_e'];
    
                for (let index = 0; index < options.length; index++) {
                    const option = options[index];
                    const order = index + 1;
    
                    const optionCell = row.getCell(headers[option]);
                    let optionRecord = {
                        question_id: newQuestion,
                        is_correct: row.getCell(headers['correct_answer']).value === option,
                        order: order
                    };
    
                    const images = worksheet.getImages();
                    const imageInCell = images.find(image => {
                        const { tl } = image.range;
                        return tl.nativeRow === optionCell.row - 1 && tl.nativeCol === optionCell.col - 1;
                    });
    
                    if (imageInCell) {
                        const imageData = workbook.getImage(imageInCell.imageId);
                        const uploadedImage = await uploadImage(fileService, imageData.buffer, imageData.extension);
                        optionRecord.option_image = uploadedImage;
                    } else {
                        optionRecord.option_text = optionCell.value;
                    }
    
                    await optionService.createOne(optionRecord);
                }
    
                questionCount++;
                console.log(`Total questions imported so far: ${questionCount}`);
            }
    
            res.status(200).json({ status: 'success', message: 'Questions and options imported successfully' });
        } catch (error) {
            console.error("Error uploading questions:", error.message);
            res.status(500).json({
                status: 'error',
                message: 'Terjadi Kesalahan, silahkan coba lagi',
            });
        }
    });
};
