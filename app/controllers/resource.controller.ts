// const AWS = require('aws-sdk');
import Upload from '../models/resource.model';

const uploadFile = async (req: any, res: any) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files provided' });
        }
        console.log(req.files, 'req.files');

        const fileUrls = await Promise.all(req.files.map((file: any) => file.location));
        console.log(fileUrls, 'fileUrls');

        const newFileUploads = req.files.map((file: any, index: any) => ({
            filename: file.originalname,
            url: fileUrls[index],
            interests: req.body.interests,
            filetype: file.mimetype,
        }));

        const rseData = await Upload.insertMany(newFileUploads);

        return res.json({ urls: rseData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error uploading files to S3' });
    }
};

export { uploadFile };