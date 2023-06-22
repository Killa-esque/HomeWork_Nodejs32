// yarn add dotenv
import dotenv from 'dotenv';
dotenv.config();

const config = {
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};

export default config 
