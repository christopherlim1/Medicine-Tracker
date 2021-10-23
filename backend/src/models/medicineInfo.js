const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    name: String,
    description: String,
    frequency: Number,
    doses: Number,
    totalCount: Number,
});

const MedicineInfo = mongoose.model('MedicineInfo', medicineSchema);

module.exports = MedicineInfo;