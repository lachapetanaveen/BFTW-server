import { IGospelofjohnbooklet } from '../interfaces/bftw.interface';
import Nglgospelbooklet from '../models/nglgospeljohnbooklet.model';
import Logger from '../../library/logger';

const gospeljohnbooklet = (body: any) => {
    return new Promise<{}>(async (resolve, reject) => {
        try {

            const user = new Nglgospelbooklet(body);

            const savedUser: IGospelofjohnbooklet = await user.save();
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

export const gospeljohnbookletServices = { gospeljohnbooklet };