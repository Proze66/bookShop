const mongoose = require('mongoose');

var schema = new mongoose.Schema({name: 'String', description: 'String', USD_price: 'Decimal128', EUR_price: 'Decimal128', file_link: 'string',
creation_date: 'date', orders_counter: 'Number'});
var product = mongoose.model('Product', schema);

module.exports = product