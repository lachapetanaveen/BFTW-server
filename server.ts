import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Logger from './library/logger';
import cors from 'cors';
import path from 'path';
import http from 'http';
import morgan from 'morgan';
import routes from './app/routes/index';
// import * as loadDoc from './api-doc/swagger';
import db from './db';


dotenv.config();

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bibles for the World  API');
});

// routes

app.use('/api/v1', routes);

// // eslint-disable-next-line no-void
// void (async function () {
//   const { swaggerServe, swaggerSetup } = await loadDoc.get_data();
//   app.use('/api-docs', swaggerServe, swaggerSetup);
// })();

// Port and connection setup
const port = process.env.PORT || 5000;
const server = new http.Server(app);
server.listen(port, () => {
  // console.info(`⚡️ Server is running at http://localhost:${port} on process no ${process.pid} `);
  Logger.info(`⚡️ Server is running at http://localhost:${port} on process no ${process.pid} `);
});

process.on('SIGINT', async () => {
  server.close(async () => {
    await db.connection.close();
  });

  process.exit(0);
});

process.on('SIGTERM', async () => {
  server.close(async () => {
    await db.connection.close();
  });
  process.exit(0);
});
