import mongoose, { Schema } from 'mongoose';
import { IAddress, IUser } from '../interfaces/user.interface';
import { config } from '../../config/config';
import jwt from 'jsonwebtoken';

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
        first_name: {
            type: String,
            trim: true,
            required: [true, 'First Name is required']
        },
        last_name: { type: String, trim: true },
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
            enum: ['A', 'NU'],
            required: [true, 'User type is required']
        },

        is_deleted: { type: Boolean, default: false },
        last_logged_in: { type: Date, default: null },
        avatar: { type: String, default: '' },
        status: { type: String, default: 'A' },
        mobile_no: {
            type: Number,
            cast: (v: any) => {
                return typeof v !== 'number' && !isNaN(v) ? Number(v) : v;
            }
        },
        company_name: { type: String },
        created_by: { type: Schema.Types.ObjectId, ref: 'user' },
        address: { type: addressScheam },
    },
    { timestamps: true }
);

// Generate User token for authentication
UserSchema.methods.isSignedToken = function () {
    return jwt.sign({ id: this._id }, config.jwt.JWT_SECRET, {
        expiresIn: config.jwt.JWT_EXPIRE
    });
};

export default mongoose.model<IUser>('user', UserSchema);
export { addressScheam };