import express from 'express';
import {
  checkUserRegistration,
  login,
  logout,
  signup,
  updatePassword,
} from '../controllers/auth.controller';
import checkAuth from '../middleware/checkAuth';
const routes = express.Router();

/**
 *  URL: /api/v1/auth/signup
 *  Method: POST
 */
routes.post('/signup', signup);

/**
 *  URL: /api/v1/auth/login
 *  Method: POST
 */
routes.post('/login', login);



/**
 *  URL: /api/v1/auth/update-password
 *  Method: POST
 */
routes.post('/update-password', updatePassword);

/**
 *  URL: /api/v1/auth/check-user-registration
 *  Method: POST
 */
routes.post('/check-user-registration', checkUserRegistration);

/**
 *  URL: /api/v1/auth/logout
 *  Method: POST
 */
routes.post('/logout', checkAuth, logout);

export const authRoute = routes;
