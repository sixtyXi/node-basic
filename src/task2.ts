import csv from 'csvtojson';
import fs from 'fs';
import { pipeline } from 'stream';

const dir = './dist';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const csvFilePath = './scv/input_example.csv';
const outputPath = `${dir}/output_example.txt`;

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(outputPath);
const converterOptions = {
  noheader: false,
  headers: ['book', 'author', 'amount', 'price'],
  ignoreColumns: /amount/,
  checkType: true,
};

const errorHandler = (error: Error): void => console.error('Pipeline failed.', error);
const successHandler = (): void =>
  console.log(`All writes are now complete. File's path is ${outputPath}`);

pipeline(
  readStream,
  csv(converterOptions).subscribe((json): PromiseLike<void> => json),
  writeStream,
  (err): void => (err ? errorHandler(err) : successHandler())
);
