import { Request, Response } from 'express';
import { bad_request, conflict, server_error, server_ok } from '../../library/server-respone';
import Logger from '../../library/logger';
import { wantlearnjesusServices } from '../services/nglwantlearnjesus.service';


const wantlearnjesus = async (req: Request, res: Response) => {
    try {
        const { say_himself, say_others, say_belive } = req.body;
        Logger.info(req.body);
        if (!say_himself || !say_others || !say_belive) {
            return bad_request(res, { msg: 'All Fields are Required' });
        }

        const savedUser = await wantlearnjesusServices.wanttolearnjesus(req.body);

        server_ok(res, { msg: 'User Data Submitted successfully', user: savedUser });
    } catch (error: any) {
        Logger.error(error);


        server_error(res, error);
    }
};

export {
    wantlearnjesus,

};