import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  MONGODB_URI: process.env.MONGODB_URI || "",

  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "15m",

  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || "",

  JWT_REFRESH_EXPIRE:
    process.env.JWT_REFRESH_EXPIRE || "30d",
};