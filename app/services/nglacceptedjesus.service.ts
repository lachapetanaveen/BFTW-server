import { IGospelofjohnbooklet, IAcceptedJesus } from '../interfaces/bftw.interface';
import Nglaccept from '../models/nglacceptedjesus.modal';
import Logger from '../../library/logger';

const Acceptedjesus = (body: any) => {
    return new Promise<{}>(async (resolve, reject) => {
        try {

            const user = new Nglaccept(body);

            const savedUser: IAcceptedJesus = await user.save();
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

export const acceptedjesusServices = { Acceptedjesus };