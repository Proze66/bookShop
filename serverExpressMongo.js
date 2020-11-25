
const Product = require("./models/Product")

const mongoose = require('mongoose');

var fs = require('fs');
var readline = require('readline');

const path = require("path");
const express = require('express');

const ejs = require("ejs");
const { replaceOne } = require("./models/Product");
const app = express();
const port ="8080";

mongoose.connect('mongodb://localhost:27017/myDb',{useNewUrlParser: true, useUnifiedTopology: true });
mongoose
.connection
.on('connect', function() {
    console.log('Mongoose default connection open to db');
});

mongoose
.connection
.on('error', function (err) {
    console.log('Mongoose default connection error;: ' + err);
});

/*Product.findOneAndUpdate({_id:...}, { $inc: {orderCounter: 1} })*/

/*
Product.create({name: 'book1',
            description: 'biographie book1',
            USD_price: 20,
            EUR_price: 16.82,
            file_link: 'book1.pdf',
            creation_date: new Date(),
            orders_counter: 0},
        (err, products) => {
    console.log(` error: ${err} ,products: ${products}`)
})

Product.create({name: 'book2',
            description: 'aventure book2',
            USD_price: 10,
            EUR_price: 8.41,
            file_link: 'book2.pdf',
            creation_date: new Date(),
            orders_counter: 0},
        (err, products) => {
    console.log(` error: ${err} ,products: ${products}`)
})
*/

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static('public'));
app.use(function (req, res, next) {
    next();
})

app.get('/', (req, res) => {
    getAllProducts((err,products) => {
        if (err) {
            res.send(err)
        } else {
            res.render("index",{products});    
        }
    });    
})

app.get('/order-product/:productId', (req, res) => {
    let productId = req.params.productId
    orderProductById(productId);
    res.send("OK")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

getAllProducts = (callback) => {
    Product.find({},callback)    
}

orderProductById = (id) => {
    console.log(id)
    Product.findOneAndUpdate({_id: id}, { $inc: {orders_counter: 1} },{new: true},(err,doc) => {
        console.log(doc)
    })    	
}
