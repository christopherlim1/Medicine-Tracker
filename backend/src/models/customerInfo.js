const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: String,
    medicineArray: [Object]
});

const CustomerInfo = mongoose.model('CustomerInfo', customerSchema);

module.exports = CustomerInfo;
