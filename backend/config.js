import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

export const PORT = process.env.PORT || 3000;
export const DB_HOST =
  process.env.DB_HOST || "lp2-2023-2.c1fmg5ipekwi.us-east-1.rds.amazonaws.com";
export const DB_USER = process.env.DB_USER || "admin";
export const DB_PASSWORD = process.env.DB_PASSWORD || "lp2-2023-2";
export const DB_DATABASE = process.env.DB_DATABASE || "bookpool";
export const DB_PORT = process.env.DB_PORT || 3306;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "daniel";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || "1d";
