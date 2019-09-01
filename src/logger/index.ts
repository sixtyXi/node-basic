import path from 'path';
import winston from 'winston';

const outputDir = path.resolve(__dirname, '../../dist');
const errorLog = path.join(outputDir, 'error.log');
const infoLog = path.join(outputDir, 'info.log');

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: errorLog, level: 'error' }),
    new winston.transports.File({ filename: infoLog, level: 'info' }),
    new winston.transports.Console()
  ]
});
