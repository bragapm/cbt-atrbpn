import ExcelJS from 'exceljs';
import fileUpload from 'express-fileupload';

export default (router, { services, exceptions, getSchema }) => {
    const { ItemsService, FilesService } = services;
    router.use(fileUpload());  //file upload middleware

    // Endpoint to upload and process Excel file
    router.post('/', async (req, res, next) => {
        try {
            const file = req.files.file;
            if (!file) {
                return res.status(400).send({ message: 'No file uploaded' });
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

            
            const headerRow = worksheet.getRow(1);
            const headers = {};
            headerRow.eachCell((cell, colNumber) => {
                headers[cell.text.trim().toLowerCase()] = colNumber;
            });

            for (const row of worksheet.getRows(2, worksheet.rowCount - 1)) { 
                
                const questionText = row.getCell(headers['question']).value;

                const materiName = row.getCell(headers['material']).value;

                const kategoriName = row.getCell(headers['category']).value;
 

                const materiRecord = await materiService.readByQuery({
                    filter: { materi: materiName },
                    limit: 1
                });
                const kategoriRecord = await kategoriService.readByQuery({
                    filter: { nama_kategori: kategoriName },
                    limit: 1
                });


                if (materiRecord.length === 0) {
                    return res.status(400).send({ message: `Materi "${materiName}" not found in database.` });
                }
                if (kategoriRecord.length === 0) {
                    return res.status(400).send({ message: `Kategori "${kategoriName}" not found in database.` });
                }

                const materi_id = materiRecord[0].id;
                const kategori_id = kategoriRecord[0].id;
 
                
                const newQuestion = await questionService.createOne({
                    question: questionText,
                    materi_id: materi_id,
                    kategori_id: kategori_id
                });
   
               
                const options = ['option_a', 'option_b', 'option_c', 'option_d', 'option_e'];
                for (const option of options) {
                    const optionCell = row.getCell(headers[option]);
                    let optionRecord = { question_id: newQuestion, is_correct: row.getCell(headers['correct_answer']).value === option };


                    const images = worksheet.getImages();
                    const imageInCell = images.find(image => {
                        const { tl } = image.range; 
                        return tl.nativeRow === optionCell.row - 1 && tl.nativeCol === optionCell.col - 1;
                    });
                    
                    console.log("imageInCell", imageInCell);

                    if (imageInCell) {
                        const imageData = workbook.getImage(imageInCell.imageId);
                        console.log("imageData", imageData); 

                        if (imageData && imageData.buffer) {
                            const uploadedImage = await fileService.uploadOne({
                                data: imageData.buffer,
                                filename_disk: `question_${newQuestion.id}_${option}.png`,
                                //folder: 'd26a0a1b-7df8-43ee-85d3-876f0695c3b1' // Ensure this folder exists
                            });
                            optionRecord.option_image = uploadedImage.id;
                        } else {
                            console.warn(`Image data missing for option ${option}`);
                        }
                    } else {
                        optionRecord.option_text = optionCell.value;
                    }
                }
            }

            res.status(200).send({ message: 'Questions and options imported successfully' });
        } catch (error) {
            console.error("Error uploading questions:", error);
            next(new Error(`Error uploading questions: ${error.message}`));
        }
    });
};
