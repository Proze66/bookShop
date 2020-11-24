var fs = require('fs');
var readline = require('readline');
let contents = fs.readFileSync(`${__dirname}/products.json`, 'utf8');
try {
	var jsonProducts = JSON.parse(contents);
} catch(e) {
	console.log(e);
	return;
}

getAllProducts = () => {	
	console.log("\u25E6 Bienvenue, Voici les produits disponibles : \x0d\x0a");
	jsonProducts.products.forEach((book, i) => {
		console.log(`\u25a0 product${i}.${book.id} - product${i}.${book.name} / product${i}.${book.EUR_price} / product${i}.${book.orders_counter}`)
	}

)}
orderProductById = (id) => {
	var foundBook;
	jsonProducts.products.forEach((book, i) => {
		if (id === book.id) {
			foundBook = book;
		}
	}) 
	if (foundBook) {		
		foundBook.orders_counter++;
		console.log(foundBook.orders_counter);
	}
	let contents = JSON.stringify(jsonProducts, null, 2);
	fs.writeFileSync(`${__dirname}/products.json`, contents, 'utf-8');
	console.log("file");	
}

var rl = readline.createInterface({input: process.stdin, terminal: false});
rl.on('line', function (line) {
	if (line.startsWith("i want product ")) {
		orderProductById(line.substr("i want product ".length));
	}
});


