// using core modules
const fs = require('fs');
const http = require('http');
const url = require('url');

// using third part modules
const slugify = require('slugify');

// using my modules
const replaceTemplate = require('../modules/replaceTemplate');

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

////////////// READING DATA/FILES ONCE //////////////

// // functions
// const replaceTemplate = (template, product) => {
//     let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);

//     if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

//     return output;
// }

// html
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
// data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

// slugify

const slugs = productData.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

////////////// ROUTING //////////////

// how do we give a different response depedent on the url path? We can use if/else

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    // step 1: load the overview html page - done above
    // step 2: change response header content type to html
    // step 3: iterate through productData so we can send that information back
    res.writeHead(200, { 'Content-type': 'text/html' });

    // we don't want an array but one big string
    const cardsHtml = productData.map((el) => replaceTemplate(tempCard, el)).join('');
    // replace the placeholder in the template overview html page
    const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
    // console.log(cardsHtml);
    res.end(output);

    // product page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    // which product do we want to display, we grab it from the productData object
    const product = productData[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API page
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(productData);

    // Not found page
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'My-own-header': 'Just some bullshit I made up',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

// now we listen on the server
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
