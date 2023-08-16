import { Request, Response } from 'express';
import { bad_request, conflict, forbidden, not_found, server_error, server_ok } from '../../library/server-respone';
import Logger from '../../library/logger';
import { UserServies } from '../services/user.service'
import User from '../models/user.model';
import { decryptPassword, encryptPassword } from '../../library/password.process';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { decodeToken, generateTokens } from '../middleware/tokens';
import { IUser } from '../interfaces/bftw.interface';


// Register User details to db as a new Account
const signup = async (req: Request, res: Response) => {
    try {
        const { full_name, email, password_hash, mobile, user_type } = req.body;
        Logger.info(req.body);
        if (!email && !full_name && !mobile && !user_type) {
            return bad_request(res, { msg: 'All field required' });
        } else if (!full_name) return bad_request(res, { msg: 'Name is required' });
        else if (!email) return bad_request(res, { msg: 'Email is required' });
        else if (!mobile) return bad_request(res, { msg: 'Mobile Number is required' });
        else if (!user_type) return bad_request(res, { msg: 'User type is required' });
        else if (!password_hash && user_type === 'NU') return bad_request(res, { msg: 'Password is required' });
        else if (password_hash && password_hash.length <= 5) {
            return bad_request(res, { msg: 'Password should be atleast 6 digit' });
        }

        const savedUser = await UserServies.saveUser(req.body);
        const userDetails: any = await User.findOne({ email });
        const token = await generateTokens(
            {
                _id: userDetails._id,
                email,
                user_type
            },
            config.hash.HASH_STRING
        );
        server_ok(res, { msg: 'User saved successfully', user: savedUser, token });
    } catch (error: any) {
        Logger.error(error);

        if (error.msg === 'User is already registered with this email') {
            return bad_request(res, error);
        } else if (error.code === 11000) {
            return conflict(res, { msg: 'User already registered with this email' });
        } else if (error.msg === 'Please fill a valid email address') {
            return bad_request(res, error);
        }
        server_error(res, error);
    }
};
// login API
const login = async (req: Request, res: Response) => {
    try {
        const { email, password_hash } = req.body;

        if (!email || !password_hash) {
            return bad_request(res, { msg: 'Email and password are required' });
        }

        const user = await User.findOne<IUser>({ email }).select('+password_hash');

        if (!user || user.is_deleted) {
            return forbidden(res, { msg: 'Invalid Email or Password' });
        }

        const isPasswordValid = await decryptPassword(password_hash, user.password_hash);
        if (!isPasswordValid) {
            return forbidden(res, { msg: 'Invalid Email or Password' });
        }

        const tokenPayload = {
            id: user._id,
            email: user.email,
        };

        const token = await generateTokens(tokenPayload);

        const responsePayload = {
            msg: 'User authenticated',
            token,
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.user_type,
            company_name: user.company_name || null,
        };

        await UserServies.updatelastLogin(user._id as any);

        server_ok(res, responsePayload);
    } catch (error) {
        Logger.error(error);
        server_error(res, error);
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        const { authorization } = req.headers;
        const token = authorization?.split(' ')[1];
        server_ok(res, { msg: 'User logout successfully' });
    } catch (error) {
        server_error(res, error);
    }
};
const checkUserRegistration = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return server_ok(res, { msg: 'User already registered' });
        }
        return not_found(res, { msg: 'User not found' });
    } catch (error) {
        Logger.error(error);
        server_error(res, error);
    }
};
const updatePassword = async (req: Request, res: Response) => {
    try {
        const { _id, oldPassword, password } = req.body;

        if (!_id && !password && !oldPassword) {
            return bad_request(res, { msg: 'All field required' });
        } else if (!_id) {
            return bad_request(res, { msg: '_id is required' });
        } else if (!oldPassword) {
            return bad_request(res, { msg: 'Recent Password is required' });
        } else if (oldPassword === password) {
            return bad_request(res, {
                msg: 'Recent and new password should be different'
            });
        } else if (!password) {
            return bad_request(res, { msg: 'New password is required' });
        } else if (password.length <= 5) {
            return bad_request(res, {
                msg: 'New password should be atleast 6 digit'
            });
        }

        let user = await User.findOne({ _id }).select('+password_hash');

        if (!user) return bad_request(res, { msg: 'User is not registered' });

        const status = await decryptPassword(password, user.password_hash);
        if (status === true) return bad_request(res, { msg: 'Recent password mismatch' });

        const hashedPassword = await encryptPassword(password);

        user = await User.findByIdAndUpdate(user._id, {
            password_hash: hashedPassword
        });

        server_ok(res, { msg: 'Password updated successfully' });
    } catch (error) {
        Logger.error(error);
        server_error(res, error);
    }
};
export {
    signup,
    login,
    logout,
    checkUserRegistration,
    updatePassword
};