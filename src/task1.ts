import readline from 'readline';
import os from 'os';

const rl = readline.createInterface({
  input: process.stdin,
});

const reverseString = (str: string): string =>
  str
    .split('')
    .reverse()
    .join('');

console.log('Type something...');

rl.on('line', (input): void => {
  const output = reverseString(input) + os.EOL;

  console.log(output);
});
