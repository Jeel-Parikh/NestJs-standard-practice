import * as dotenv from 'dotenv';

dotenv.config();
export const ENV_VARIABLES = {
  // Server config
  PORT: parseInt(process.env.PORT),
  // Access & Refresh token config
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  ACCESS_TOKEN_COOKIE_EXPIRE_TIME: parseInt(
    process.env.ACCESS_TOKEN_COOKIE_EXPIRE_TIME,
  ),
  // Database credentials
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE_NAME: process.env.DB_DATABASE_NAME,
} as const;
