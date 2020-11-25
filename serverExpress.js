
var fs = require('fs');
var readline = require('readline');

const path = require("path");
const express = require('express');

const ejs = require("ejs");
const app = express();
const port ="8080";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static('public'));
app.use(function (req, res, next) {
    next();
})

app.get('/', (req, res) => {
    let products = getAllProducts();
    res.render("index",{products});    
})

app.get('/order-product/:productId', (req, res) => {
    let productId = req.params.productId
    orderProductById(productId);
    res.send("OK")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

getAllProducts = () => {
    
    let contents = fs.readFileSync(`${__dirname}/products.json`, 'utf8');
    try {
        var jsonProducts = JSON.parse(contents);
    } catch(e) {
        console.log(e);
        return;
    }    
	console.log("\u25E6 Bienvenue, Voici les produits disponibles : \x0d\x0a");
	return jsonProducts.products	
}

orderProductById = (id) => {
    var foundBook;
    let contents = fs.readFileSync(`${__dirname}/products.json`, 'utf8');
    try {
        var jsonProducts = JSON.parse(contents);
    } catch(e) {
        console.log(e);
        return;
    }    
	jsonProducts.products.forEach((book, i) => {
		if (id === book.id) {
			foundBook = book;
		}
	}) 
	if (foundBook) {		
		foundBook.orders_counter++;
		console.log(foundBook.orders_counter);
	}
	let newContents = JSON.stringify(jsonProducts, null, 2);
	fs.writeFileSync(`${__dirname}/products.json`, newContents, 'utf-8');	
}
