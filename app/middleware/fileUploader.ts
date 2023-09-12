import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const s3 = new S3Client({
    region: 'us-west-2',
    // endpoint: 'https://bftw-resources.s3.amazonaws.com',
    credentials: fromCognitoIdentityPool({
        clientConfig: { region: 'us-west-2' },
        identityPoolId: 'us-west-2:c6436823-bfa5-4599-9277-ba58761ae075',
    })
});
const s3Storage = multerS3({
    s3: s3, // Use the S3 client created in awsConfig.js
    bucket: 'bftw-resources', // Replace with your desired bucket name
    metadata: (req, file, cb) => {
        console.log(file, 'file');
        cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
        const mimeType = file.mimetype.split('/')[1];
        const fileName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, `/${mimeType}/${fileName}`);
    },
});




const upload = multer({

    storage: s3Storage
});

export { upload }