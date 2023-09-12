import { Request, Response } from 'express';
import { bad_request, conflict, forbidden, not_found, server_error, server_ok } from '../../library/server-respone';
import Logger from '../../library/logger';
import { UserServies } from '../services/user.service'
import nglemailsignup from '../models/nglemailsignup.model'


const emailsignup = async (req: Request, res: Response) => {
    try {
        const { name, email, address } = req.body;
        Logger.info(req.body);
        if (!email) {
            return bad_request(res, { msg: 'Email is Required' });
        }

        const savedUser = await UserServies.saveUser(req.body);
        const userDetails: any = await nglemailsignup.findOne({ email });

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
    emailsignup,

};