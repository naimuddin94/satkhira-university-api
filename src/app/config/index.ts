import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  salt: process.env.BCRYPT_SALT,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_expiry: process.env.ACCESS_TOKEN_EXPIRY,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  refresh_token_expiry: process.env.REFRESH_TOKEN_EXPIRY,
};
