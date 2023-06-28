const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
// const routes = require('./routes/index');

// const db = require('./db');


dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send('Welcome to Storage Auction API');
});

// routes

// app.use('/api/v1', routes);

// // eslint-disable-next-line no-void
// void (async function () {
//   const { swaggerServe, swaggerSetup } = await loadDoc.get_data();
//   app.use('/api-docs', swaggerServe, swaggerSetup);
// })();

// Port and connection setup
const port = process.env.PORT || 5000;

// app.use("*", (req, res, next) => {
//   res.status(404).send("<h1>404 not found</h1>");
// });
const server = new http.Server(app);

server.listen(port, () => {
  console.info(`⚡️ Server is running at http://localhost:${port} on process no ${process.pid} `);
  // Logger.info(`⚡️ Server is running at http://localhost:${port} on process no ${process.pid} `);
});

// process.on('SIGINT', async () => {
//   server.close(async () => {
//     await db.connection.close();
//     await redis.quit();
//   });

//   process.exit(0);
// });

// process.on('SIGTERM', async () => {
//   server.close(async () => {
//     await db.connection.close();
//     await redis.quit();
//   });
//   process.exit(0);
// });
