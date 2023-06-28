import express from 'express';
import checkAuth from '../middleware/checkAuth';
import { getUsers, getSingleUser, removeUser, updateUser } from '../controllers/user.controller';
const routes = express.Router();

routes.get('/', checkAuth, getUsers);
routes.get('/:id', checkAuth, getSingleUser);
routes.put('/:id', checkAuth, updateUser);
routes.delete('/:id', checkAuth, removeUser);

export const userRoutes = routes;
