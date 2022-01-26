// read and write files - blocking and unblocking method
const fs = require('fs');

// Blocking, synchronously
// const inputText = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(inputText);
// const textOut = `This is what we know about the avocado: ${inputText}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been written..');

// Non-blocking, asynchronously
fs.readFile('./txt/start.txt', 'utf-8',(err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8',(err, data2) => {
        console.log(data2);

        fs.writeFile('./txt/final.txt', `${data1}\n${data2}`, 'utf-8', err => {
            console.log('File has been written to final.txt');
        })
    });
});
console.log('This will execute as file is being read');