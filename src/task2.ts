import csv from 'csvtojson';
import fs from 'fs';
import { pipeline } from 'stream';

import { outputDir, inputPath, outputPath, converterOptions } from './task2-config';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const readStream = fs.createReadStream(inputPath);
const writeStream = fs.createWriteStream(outputPath);
const converter = csv(converterOptions).preFileLine((data, lineIdx): string =>
  lineIdx === 0 ? data.toLowerCase() : data
);

const errorHandler = (error: Error): void => console.error('Pipeline failed.', error);
const successHandler = (): void =>
  console.log(`All writes are now complete. File's path is ${outputPath}`);

pipeline(readStream, converter, writeStream, (err): void => {
  if (err) {
    errorHandler(err);
  } else {
    successHandler();
  }
});
