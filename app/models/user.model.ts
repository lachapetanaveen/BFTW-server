import mongoose, { Schema } from 'mongoose';
import { IAddress, IUser } from '../interfaces/bftw.interface';
import { config } from '../../config/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// Email Validation
const validateEmail = function (email: any) {
    const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return re.test(email);
};

const addressScheam: Schema = new Schema<IAddress>(
    {
        address1: { type: String },
        address2: { type: String },
        city: { type: String, required: true, trim: true },
        state: { type: mongoose.Schema.Types.ObjectId, ref: 'state' },
        zipcode: { type: String, required: true, trim: true },
        lat: { type: String },
        lang: { type: String }
    },
    { timestamps: true }
);
mongoose.model<IAddress>('address', addressScheam);

const UserSchema: Schema = new Schema<any>(
    {
        full_name: {
            type: String,
            trim: true,
            required: [true, 'Name is required']
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
        password_hash: { type: String, required: true, select: false },
        user_type: {
            type: String,
            default: 'NU',
            enum: ['A', 'NU'],  // NU= New user/ user , A= Admin
            required: [true, 'User type is required']
        },

        is_deleted: { type: Boolean, default: false },
        avatar: { type: String, default: '' },
        mobile: {
            type: Number,
            cast: (v: any) => {
                return typeof v !== 'number' && !isNaN(v) ? Number(v) : v;
            }
        },

        interests: {
            type: [
                {
                    type: String,
                    enum: ['baptism', 'counseling', 'cwc', 'ms'] // cwc = Connect with Church, ms = More Scripture
                }
            ],
            default: [] // Optional: Set a default empty array if needed
        },
        created_by: { type: Schema.Types.ObjectId, ref: 'user' },

    },
    { timestamps: true }
);





// Generate User token for authentication
UserSchema.methods.isSignedToken = function () {
    return jwt.sign({ id: this._id }, config.jwt.JWT_SECRET, {
        expiresIn: config.jwt.JWT_EXPIRE
    });
};

export default mongoose.model<IUser>('User', UserSchema);
export { addressScheam };