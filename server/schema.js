const mongoose = require('mongoose');

let plateSchema = new mongoose.Schema({
    _id: String,
    name: String,
    surname: String,
    address: String,
    phone: Number,
    email: String
},{
    collection: 'owners'
});

module.exports = mongoose.model('Plate', plateSchema);