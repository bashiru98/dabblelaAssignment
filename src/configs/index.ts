const {
  DB_URI,
  PORT,
} = process.env;
export { default as logger } from "./logger";
export const port = PORT || 5000;
export const MONGO_URI = DB_URI ?? "mongodb://localhost:27017/Dabblelab";



