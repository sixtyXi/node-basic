import path from 'path';
import winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const customFormat = printf(({ level, message, ...meta }): string => {
  // eslint-disable-next-line no-shadow
  const { timestamp } = meta;
  const msg = typeof message === 'string' ? message : JSON.stringify(message);

  return `[${timestamp}] ${level}: ${msg}`;
});

const outputDir = path.resolve(__dirname, '../../dist');
const errorLog = path.join(outputDir, 'error.log');
const infoLog = path.join(outputDir, 'info.log');

export const logger = winston.createLogger({
  format: combine(timestamp(), customFormat),
  transports: [
    new winston.transports.File({ filename: errorLog, level: 'error' }),
    new winston.transports.File({ filename: infoLog, level: 'info' }),
    new winston.transports.Console()
  ]
});
