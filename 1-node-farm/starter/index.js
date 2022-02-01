// read and write files - blocking and unblocking method
const fs = require('fs');
const http = require('http');
const url = require('url');

////////////// FILES //////////////

// Blocking, synchronously

// const inputText = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(inputText);
// const textOut = `This is what we know about the avocado: ${inputText}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been written..');

// Non-blocking, asynchronously

// fs.readFile('./txt/start.txt', 'utf-8',(err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8',(err, data2) => {
//         console.log(data2);

//         fs.writeFile('./txt/final.txt', `${data1}\n${data2}`, 'utf-8', err => {
//             console.log('File has been written to final.txt');
//         })
//     });
// });
// console.log('This will execute as file is being read');




////////////// SERVERS //////////////

// create the server
// const server = http.createServer((req, res) => {
//     console.log(req);
//     res.end('Hello fucker. Coming from the server!');
// })

// // now we listen on the server
// server.listen(8000, '127.0.0.1', () => {
//     console.log('Listening to requests on port 8000');
// })


////////////// ROUTING //////////////
const data = fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8')
const productData = JSON.parse(data);


// how do we give a different response depedent on the url path? We can use if/else
const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is overview and or Home');
    } else if (pathName === '/product') {
        res.end('This is the products page');
    } else if (pathName === '/api') {
        res.writeHead(200, {
        'Content-type': 'application/json'});
        res.end(productData);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'My-own-header':'Just some bullshit I made up',
        });
        res.end('<h1>Page not found!</h1>');
    }
})

// now we listen on the server
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})