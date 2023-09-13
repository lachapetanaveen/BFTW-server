import mongoose, { Schema } from 'mongoose';
import { IGospelofjohnbooklet } from '../interfaces/bftw.interface';


const GospelJohnBookletSchema: Schema = new Schema<any>(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            required: false,
            unique: true,
            trim: true,
            lowercase: true,
        },
        address: {
            type: String,
            required: true,
            trim: true
        }

    },
    { timestamps: true }
);


export default mongoose.model<IGospelofjohnbooklet>('Nglgospelbooklet', GospelJohnBookletSchema);