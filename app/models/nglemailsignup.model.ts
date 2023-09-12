import mongoose, { Schema } from 'mongoose';
import { IEmailSignup } from '../interfaces/bftw.interface';

const validateEmail = function (email: any) {
    const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return re.test(email);
};

const EmailSignupSchema: Schema = new Schema<any>(
    {
        name: {
            type: String,
            trim: true,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Please fill a valid email address']
        },
        address: {
            type: String,
            required: false,
            trim: true
        }

    },
    { timestamps: true }
);


export default mongoose.model<IEmailSignup>('Nglemail', EmailSignupSchema);