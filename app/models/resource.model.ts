import mongoose, { Schema } from 'mongoose';
import { IUpload } from '../interfaces/bftw.interface';

const uploadSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    url: { type: String, required: true },
    interests: { type: [String], required: true }, // Array of interests
    filetype: { type: String, required: true },
});

// const Upload = mongoose.model('Upload', uploadSchema);

// module.exports = Upload;
export default mongoose.model<IUpload>('resource', uploadSchema);