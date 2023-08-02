import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model'
import Logger from '../../library/logger';
import { config } from '../../config/config';
const checkAuth = async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token
      const decoded: any = await decodeToken(token)

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

};

const decodeToken = async (token: string, secret?: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded = await jwt.verify(token, secret || config.jwt.JWT_SECRET);
      resolve(decoded);
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
};
export default checkAuth;
