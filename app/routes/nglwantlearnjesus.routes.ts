import express from 'express';
import { wantlearnjesus } from '../controllers/nglwantlearnjesus.controller';




const routes = express.Router();


routes.post('/wantlearnjesus', wantlearnjesus);



export const nglwantlearnjesus = routes;