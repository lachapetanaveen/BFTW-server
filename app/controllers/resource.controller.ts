const AWS = require('aws-sdk');
import Upload from '../models/resource.model';
import { config } from '../../config/config';
import { FileService } from '../middleware/fileupload'

AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
});

// const s3 = new AWS.S3();

// const uploadFileToS3 = async (file: any) => {
//     const params = {
//         Bucket: config.aws.bucketname,
//         Key: file.originalname,
//         Body: file.buffer,
//     };

//     return new Promise((resolve, reject) => {
//         s3.upload(params, (err: any, data: any) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data.Location);
//             }
//         });
//     });
// };

const uploadFile = async (req: any, res: any) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files provided' });
        }
        console.log(req.files, 'req.files');

        const uploadPromises = req.files.map((file: any) => FileService.upload.single(file));

        const fileUrls = await Promise.all(uploadPromises);

        const newFileUploads = req.files.map((file: any, index: any) => ({
            filename: file.originalname,
            url: fileUrls[index],
            interests: req.body.interests,
            filetype: file.mimetype,
        }));

        await Upload.insertMany(newFileUploads);

        return res.json({ urls: fileUrls });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error uploading files to S3' });
    }
};

export { uploadFile };