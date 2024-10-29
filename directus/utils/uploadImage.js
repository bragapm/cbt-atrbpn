// utils/uploadImage.js
import Busboy from 'busboy';
import { Readable } from 'stream';

export async function uploadImage(fileService, buffer, extension) {
    const mimeType = `image/${extension}`;
    const data = {
        filename_download: `uploaded_image_${Date.now()}.${extension}`,
        type: mimeType,
        storage: 's3',
        folder: 'd26a0a1b-7df8-43ee-85d3-876f0695c3b1'
    };

    // Directly upload the buffer without Busboy
    return await fileService.uploadOne(buffer, data);
}
// export async function uploadImage(fileService, buffer, extension) {
//     const busboy = Busboy({ headers: { 'content-type': `multipart/form-data; boundary=${Math.random()}` } });

//     const mimeType = `image/${extension}`;
//     console.log(mimeType);
//     const data = {
//         filename_download: `uploaded_image_${Date.now()}.${extension}`,
//         type: mimeType,
//         storage: 'local',
//         folder: 'd26a0a1b-7df8-43ee-85d3-876f0695c3b1'
//     };
//     console.log("data", data);
//     const stream = new Readable();
//     stream.push(buffer);
//     stream.push(null); 

//     // Handle file upload
//     return new Promise((resolve, reject) => {
//         busboy.on('file', async (fieldname, fileStream) => {
//             try {
//                 const uploadedImage = await fileService.uploadOne(fileStream, data);
//                 console.log("uploadedImage", uploadedImage);
//                 resolve(uploadedImage);
//             } catch (error) {
//                 reject(error);
//             }
//         });

//         busboy.on('error', (error) => reject(error));

//         // Pipe the buffer stream into Busboy
//         stream.pipe(busboy);
//     });
// }
