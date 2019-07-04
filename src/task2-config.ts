import path from 'path';

const inputDir = path.resolve(__dirname, '../scv');
const outputDir = path.resolve(__dirname, '../output');
const inputPath = path.join(inputDir, 'input_example.csv');
const outputPath = path.join(outputDir, 'output_example.txt');

const converterOptions = {
  noheader: false,
  ignoreColumns: /amount/i,
  checkType: true,
};

export { outputDir, inputPath, outputPath, converterOptions };
