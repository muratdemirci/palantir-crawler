import dotenv from "dotenv";
import path from "path";

const dotenvConfig= path.join(__dirname, "../../.env");

dotenv.config({ path: dotenvConfig });

export const PORT= process.env.PORT;
export const DB_NAME:string = process.env.DB_NAME!;
export const DB_HOST:string = process.env.DB_HOST!;
export const DB_PORT:number = parseInt(process.env.DB_PORT!);
export const DB_USER:string = process.env.DB_USER!;
export const DB_PASS:string = process.env.DB_PASS!;
export const TOKENS:string[] = process.env.BEARER_TOKENS!.split(',')
export const START_TIME:number = parseInt(process.env.MS_FROM_NOW!);
export const DAILY_MS:number = parseInt(process.env.DAILY_MS!);