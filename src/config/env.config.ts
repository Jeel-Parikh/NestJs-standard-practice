import * as dotenv from 'dotenv';

dotenv.config();
export const ENV_VARIABLES = {
  PORT: parseInt(process.env.PORT),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  ACCESS_TOKEN_COOKIE_EXPIRE_TIME: parseInt(
    process.env.ACCESS_TOKEN_COOKIE_EXPIRE_TIME,
  ),
} as const;
