/* eslint-disable no-undef */
import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, label, printf } = format;

//Customm Log Format

const logFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp as string);
  // const hour = date.getHours();
  // const minutes = date.getMinutes();
  // const seconds = date.getSeconds();
  const localTime = date.toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return `${date.toDateString()} ${localTime} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(label({ label: "DOCKER" }), timestamp(), logFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "successes",
        "docker-%DATE%-success.log",
      ),
      datePattern: "YYYY-MM-DD-HH-mm-ss",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

const errorlogger = createLogger({
  level: "error",
  format: combine(label({ label: "DOCKER" }), timestamp(), logFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "errors",
        "docker-%DATE%-error.log",
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export { errorlogger, logger };
