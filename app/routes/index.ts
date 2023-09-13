import express, { NextFunction, Request, Response } from 'express';
import { authRoute } from './auth.routes';
import checkAuth from '../middleware/checkAuth';
import { userRoutes } from './user.routes';
import path from 'path';
import { resourseRoutes } from './resource.routes';
import { messageRoute } from './messageRoutes';
import { chatRoute } from './chatRoutes';
import { nglemailsignuproute } from './nglemailsignup.routes';
import { nglGospeljohnbooklet } from './nglgospeljohnbooklet.routes';
import { nglgospeljohndownload } from './nglgospeljohndownload.routes';
import { nglacceptedjesus } from './nglacceptedjesus.routes';
import { nglwantlearnjesus } from './nglwantlearnjesus.routes';
const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bibles for the Worlds Api version 1.0 ');
});

// auth routes /api/v1/auth
routes.use('/auth', authRoute);

// User Routes
routes.use('/users', checkAuth, userRoutes);

routes.use('/resourse', resourseRoutes)
routes.use('/chat', chatRoute)
routes.use('/message', messageRoute)
routes.use('/nglemail', nglemailsignuproute)
routes.use('/nglgospeljohnbooklet', nglGospeljohnbooklet)
routes.use('/nglgospeljohndownload', nglgospeljohndownload)
routes.use('/nglacceptedjesus', nglacceptedjesus)
routes.use('/nglwantlearnjesus', nglwantlearnjesus)
export = routes;
