import { IGospelofjohnbooklet, IWantLearnJesus } from '../interfaces/bftw.interface';
import Nglwantlearn from '../models/nglwantlearnjesus.modal';
import Logger from '../../library/logger';

const wanttolearnjesus = (body: any) => {
    return new Promise<{}>(async (resolve, reject) => {
        try {

            const user = new Nglwantlearn(body);

            const savedUser: IWantLearnJesus = await user.save();
            resolve(savedUser);
        } catch (error: any) {
            if (error.code === '11000') {
                reject({ msg: 'User Data Submitted SuccessFully' });
            } else if (error.errors) {
                Logger.error(error.errors);
                reject({ msg: error.errors?.email?.message });
            } else {
                reject(error);
            }
        }
    });
};

export const wantlearnjesusServices = { wanttolearnjesus };