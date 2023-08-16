import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import { Server as SocketServer } from 'socket.io';
import routes from './app/routes/index';
import db from './db';
import Logger from './library/logger';
dotenv.config();

const port: number = Number(process.env.PORT) || 5000;
const app = express();
const server = http.createServer(app);



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bibles for the World API');
});

// routes
app.use('/api/v1', routes);

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

/* Set up Socket.io with the http server   */
const io: SocketServer = new SocketServer(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    let newRoom: any = room && room._id ? room._id : room;
    socket.join(newRoom)
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    // console.log("newMessageRecieved ", newMessageRecieved);

    let chat = newMessageRecieved.chat;
    if (!chat.users) {
      if (chat._id == newMessageRecieved.sender._id) return;
      socket.in(chat._id).emit("message recieved", newMessageRecieved);
    } else {
      chat.users.forEach((user: any) => {
        if (user._id == newMessageRecieved.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    }
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    // socket.leave(userData._id);
  });
});