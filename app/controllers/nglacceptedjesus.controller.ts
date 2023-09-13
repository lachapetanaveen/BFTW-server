import { Request, Response } from 'express';
import { bad_request, conflict, forbidden, not_found, server_error, server_ok } from '../../library/server-respone';
import Logger from '../../library/logger';
import { acceptedjesusServices } from '../services/nglacceptedjesus.service';



const acceptedjesus = async (req: Request, res: Response) => {
    try {
        const { name, email, address } = req.body;
        Logger.info(req.body);
        if (!name) {
            return bad_request(res, { msg: 'Name is Required' });
        } else if (!address) {
            return bad_request(res, { msg: 'Address is Required' });
        }

        const savedUser = await acceptedjesusServices.Acceptedjesus(req.body);

        server_ok(res, { msg: 'User saved successfully', user: savedUser });
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

export {
    acceptedjesus,

};