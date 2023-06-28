import mongoose from 'mongoose';
import { config } from './config/config';
import Logger from './library/logger';
import { stringify } from 'querystring';
const url: string | undefined = config.mongo.uri;
/** Connecting to Database */
const connectToDatabase = async () => {
  try {
    url ? await mongoose.connect(url) : Logger.error(`Database connection URL is not defined`);
    Logger.success(`MongoDB connected successfully to host ${mongoose.connection.host}`);
  } catch (err) {
    Logger.error(`Database connection failed\n${err}`);
  }
};
connectToDatabase();
mongoose.set('strictQuery', false);
mongoose.set('strictPopulate', false);

mongoose.connection.on('disconnected', function () {
  Logger.info('Mongodb connected disconnected');
});

export default mongoose;
