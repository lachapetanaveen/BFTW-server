import { IEmailSignup } from '../interfaces/bftw.interface';
import Nglemail from '../models/nglemailsignup.model';
import Logger from '../../library/logger';

const emailsignup = (body: any) => {
    return new Promise<{}>(async (resolve, reject) => {
        try {

            const user = new Nglemail(body);

            const savedUser: IEmailSignup = await user.save();
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

export const emailSignupServices = { emailsignup };