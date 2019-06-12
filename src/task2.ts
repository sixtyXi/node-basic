import csv from 'csvtojson';
import fs from 'fs';

const csvFilePath = './scv/input_example.csv';
const outputPath = './dist/output_example.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(outputPath);

const errorHandler = (error: Error): void => console.log(error);

readStream.on('error', errorHandler);
writeStream.on('error', errorHandler);
writeStream.on('finish', (): void => {
  console.log(`All writes are now complete. File's path is ${outputPath}`);
});

readStream
  .pipe(
    csv({
      colParser: {
        Amount: 'omit',
      },
    }).subscribe((json): void => {
      return json;
    }, errorHandler)
  )
  .pipe(writeStream);
