import winston from "winston";
const { colorize, combine, errors, printf, timestamp } = winston.format;
const colorizer = colorize();
const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const level = isProd ? "info" : "debug";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "blue",
  debug: "white",
});

const format = combine(
  timestamp(),
  ...(isDev ? [errors({ stack: true })] : []),
  printf((info) => `${info.timestamp}: ${info.message}`)
);

const transports = [
  new winston.transports.File({
    filename: "logs.log",
  }),
  ...(isDev
    ? [
        new winston.transports.Console({
          format: combine(
            printf((info) => {
              const lines =
                info.stack
                  ?.split("\n")[1]
                  ?.slice(7)
                  .match(/argos360_api\/(src\/.+)\)/)?.[1] ?? "";

              return `${info.timestamp}${
                lines ? " at " + colorizer.colorize("debug", lines) : ""
              }: ${info.message}`;
            }),
            colorize({ all: true })
          ),
        }),
      ]
    : []),
];

const Logger = winston.createLogger({
  level,
  levels,
  format,
  transports,
});

export default Logger;
