import mongoose, { Schema } from 'mongoose';
import { IAcceptedJesus } from '../interfaces/bftw.interface';


const validateEmail = function (email: any) {
    const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return re.test(email);
};

const AcceptedJesus: Schema = new Schema<any>(
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


export default mongoose.model<IAcceptedJesus>('Nglaccept', AcceptedJesus);