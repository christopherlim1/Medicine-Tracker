const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    googleID: String,
    name: String,
    description: String,
    frequency: Number,
    doses: Number,
    totalAmount: Number,
    events: [Object],
    time: String,
    taken: Boolean,
});

const MedicineInfo = mongoose.model('MedicineInfo', medicineSchema);

module.exports = MedicineInfo;
