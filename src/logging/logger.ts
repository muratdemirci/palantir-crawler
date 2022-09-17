import winston from "winston";
import path from "path"

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(__dirname,"../../logs/info.log"), level: "info" }),
    new winston.transports.File({ filename: path.join(__dirname,"../../logs/warn.log"), level: "warn" }),
    new winston.transports.File({ filename: path.join(__dirname,"../../logs/error.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(__dirname,"../../logs/error.log") }),
  ],
});
