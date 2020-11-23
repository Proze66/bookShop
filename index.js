let fs = require('fs');
let contents = fs.readFileSync(`${__dirname}/products.json`, 'utf8');
let jsonProducts = JSON.parse(contents);
console.log(Object.values(jsonProducts));