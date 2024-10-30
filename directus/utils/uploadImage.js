// utils/uploadImage.js
import { Readable } from 'stream';

export async function uploadImage(fileService, buffer, extension) {
    const mimeType = `image/${extension}`;
    const data = {
        filename_download: `uploaded_image_${Date.now()}.${extension}`,
        type: mimeType,
        storage: 's3',
        folder: 'd26a0a1b-7df8-43ee-85d3-876f0695c3b1'
    };

    
    return await fileService.uploadOne(buffer, data);
}

