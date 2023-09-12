import express from 'express';
import {
    emailsignup
} from '../controllers/nglemailsignupemail.controller';
import checkAuth from '../middleware/checkAuth';
const routes = express.Router();


routes.post('/emailsignup', emailsignup);



export const nglemailsignuproute = routes;