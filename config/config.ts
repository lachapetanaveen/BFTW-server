import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DB = process.env.MONGO_DB || '';

const MONGO_URI = process.env.MONGO_URI || '';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '';

const MAIL_EMAIL = process.env.MAIL_EMAIL || '';
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || '';
const MAIL_SERVICE = process.env.MAIL_SERVICE || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';

const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URI}/${MONGO_DB}?w=majority&authSource=admin`;
// const MONGO_URL = process.env.MONGO_URI_TEST 
const HASH_STRING = process.env.HASH_STRING || '';

export const config = {
  mongo: {
    uri: MONGO_URL
  },
  jwt: {
    JWT_EXPIRE,
    JWT_SECRET
  },
  mail: {
    email: MAIL_EMAIL,
    password: MAIL_PASSWORD,
    service: MAIL_SERVICE,
    adminEmail: ADMIN_EMAIL
  },
  hash: {
    HASH_STRING
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketname: process.env.AWS_BUCKET
  }
};
