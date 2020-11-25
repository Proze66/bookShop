const mongoose = require('mongoose');

var schema = new mongoose.Schema({name: 'String', size: 'string'});
var Tank = mongoose.model('Tank', schema);

module.exports = Tank