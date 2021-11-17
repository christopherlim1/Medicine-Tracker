const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    googleID: String,
    name: String,
    description: String,
    frequency: Number,
    doses: Number,
    totalAmount: Number,
    events: [Object],
    deletedEvents: [Object],
    time: String,
});

const MedicineInfo = mongoose.model('MedicineInfo', medicineSchema);

module.exports = MedicineInfo;
