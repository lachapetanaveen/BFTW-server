import express from 'express';
import checkAuth from '../middleware/checkAuth';
import { uploadFile } from '../controllers/resource.controller';
const routes = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routes.post('/resourceupload', upload.array('files'), uploadFile);

export const resourseRoutes = routes;