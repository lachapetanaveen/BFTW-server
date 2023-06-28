import { Response, NextFunction } from 'express';

const checkAuth = async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(res.status(403).json({ msg: 'Not Authorized' }));
  }
};

export default checkAuth;
