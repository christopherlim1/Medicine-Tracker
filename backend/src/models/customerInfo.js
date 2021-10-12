const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: String,
});

const CustomerInfo = mongoose.model('CustomerInfo', customerSchema);

module.exports = CustomerInfo;
