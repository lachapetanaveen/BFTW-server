import jwt from 'jsonwebtoken';
import Logger from '../../library/logger';
import { config } from '../../config/config';

const generateTokens = async (obj: {}, secret?: string) => {
  return new Promise<{}>(async (resolve, reject) => {
    try {
      const token = await jwt.sign(obj, secret || config.jwt.JWT_SECRET, {
        expiresIn: config.jwt.JWT_EXPIRE
      });
      resolve(token);
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
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
export { generateTokens, decodeToken };
