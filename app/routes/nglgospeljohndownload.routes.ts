import express from 'express';
import { gospeljohndownload } from '../controllers/nglgospeljohndownload.controller';



const routes = express.Router();


routes.post('/gospeljohndownload', gospeljohndownload);



export const nglgospeljohndownload = routes;