import mongoose, { Schema } from 'mongoose';
import { IWantLearnJesus } from '../interfaces/bftw.interface';




const WantLearnJesus: Schema = new Schema<any>(
    {
        say_himself: {
            type: String,
            trim: true,
            required: true
        },
        say_others: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        say_belive: {
            type: String,
            required: true,
            trim: true
        }

    },
    { timestamps: true }
);


export default mongoose.model<IWantLearnJesus>('Nglwantlearn', WantLearnJesus);