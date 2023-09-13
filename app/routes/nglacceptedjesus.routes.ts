import express from 'express';
import { acceptedjesus } from '../controllers/nglacceptedjesus.controller';




const routes = express.Router();


routes.post('/acceptedjesus', acceptedjesus);



export const nglacceptedjesus = routes;