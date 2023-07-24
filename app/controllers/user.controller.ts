import { Request, Response } from 'express';
import User from '../models/user.model';
import Logger from '../../library/logger';
import { server_ok, server_error, not_found, bad_request } from '../../library/server-respone';

const getUsers = async (req: Request, res: Response) => {
    try {
        let query: any = req.query;
        query = {
            ...query,
            ...{
                is_deleted: { $eq: false }
            }
        };

        const users = await User.find(query)
            .populate({
                path: 'address',
                populate: {
                    path: 'state',
                    model: 'state'
                }
            })
            .populate('created_by');

        server_ok(res, users);
    } catch (error) {
        Logger.error(error);
        server_error(res, error);
    }
};

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return not_found(res, { msg: 'User not found' });
        }

        server_ok(res, user);
    } catch (error) {
        Logger.error(error);
        server_error(res, error);
    }
};

const removeUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return bad_request(res, { msg: 'User not found' });
        }

        await User.findByIdAndDelete(user._id, { is_deleted: true });
        server_ok(res, { msg: 'User removed successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return bad_request(res, { msg: 'User not found' });
        }
        delete req.body.email;
        const updatedUser = await User.findByIdAndUpdate(user._id, req.body);
        server_ok(res, { msg: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json(error);
    }
};

export { removeUser, getUsers, getSingleUser, updateUser };
