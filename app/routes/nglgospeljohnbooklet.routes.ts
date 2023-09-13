import express from 'express';
import { gospeljohnbooklet } from '../controllers/nglgospeljohnbooklet.controller';


const routes = express.Router();


routes.post('/gospeljohnbooklet', gospeljohnbooklet);



export const nglGospeljohnbooklet = routes;