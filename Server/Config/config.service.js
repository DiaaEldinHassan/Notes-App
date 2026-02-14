import { config } from "dotenv";
import { resolve } from "node:path";

config({path:resolve("Config/.env.development")});

export const serverPort=process.env.PORT;
export const db_uri=process.env.DB_URI;
export const jwt_sk=process.env.JWT_SK;
export const salt=process.env.SALT_ROUNDS;
export const encryption_sk=process.env.ENCRYPTION_SK;
export const client_id=process.env.CLIENT_ID;