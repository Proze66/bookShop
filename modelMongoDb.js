const Tank = require("./models/Tank")

const mongoose = require('mongoose');
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

//var schema = new mongoose.Schema({name: 'String', size: 'string'});
//var Tank = mongoose.model('Tank', schema);
//let myTank = new Tank({name: 'me', size: '1m75'});
//myTank.name = "me"
//myTank.size = "1m75"

Tank.find({name: 'me', size: '1m75'}, (err, products) => {
    console.log(` error: ${err} ,products: ${products}`)
})
/*myTank.save((err, product) => {
    console.log(` error: ${err} ,product: ${product}`)
} )*/

console.log(Tank);