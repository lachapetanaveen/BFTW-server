import express, { NextFunction, Request, Response } from 'express';
import { authRoute } from './auth.routes';
import checkAuth from '../middleware/checkAuth';
import { userRoutes } from './user.routes';
import path from 'path';
import { resourseRoutes } from './resource.routes';
const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bibles for the Worlds Api version 1.0 ');
});

// auth routes /api/v1/auth
routes.use('/auth', authRoute);

// User Routes
routes.use('/users', checkAuth, userRoutes);

routes.use('/resourse', resourseRoutes)

export = routes;
