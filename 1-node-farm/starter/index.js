// read and write files
const fs = require('fs');

const inputText = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(inputText);

const textOut = `This is what we know about the avocado: ${inputText}.\n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File has been written..');