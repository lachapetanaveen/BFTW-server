import User from '../models/user.model';
import { encryptPassword } from '../../library/password.process';
import Logger from '../../library/logger';
import { IUser } from '../interfaces/user.interface';


const saveUser = (body: any) => {
    return new Promise<{}>(async (resolve, reject) => {
        try {
            const randomPassword = (Math.random() + 1).toString(36).substring(5);
            const hashedPassword = await encryptPassword(body.password_hash || randomPassword);
            body.password_hash = hashedPassword;
            console.log('req.body', body)
            const user = new User(body);

            const savedUser: IUser = await user.save();
            resolve(savedUser);
        } catch (error: any) {
            if (error.code === '11000') {
                reject({ msg: 'User is already registered with this email' });
            } else if (error.errors) {
                Logger.error(error.errors);
                reject({ msg: error.errors?.email?.message });
            } else {
                reject(error);
            }
        }
    });
};

const updatelastLogin = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const timestamps = new Date().toISOString();
            const updatedData = await User.findByIdAndUpdate(id, {
                last_logged_in: timestamps
            });
            resolve(updatedData);
        } catch (error) {
            reject(error);
            Logger.error(error);
        }
    });
};
const getFullRole = (role: string) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            if (role === 'NU') {
                resolve('USER');
            } else if (role === 'A') {
                resolve('Admin');
            } else {
                resolve('USER');
            }
        } catch (error) {
            reject(error);
            Logger.error(error);
        }
    });
};
export const UserServies = { saveUser, updatelastLogin, getFullRole };
