const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    name: String,
    description: String,
});

const MedicineInfo = mongoose.model('MedicineInfo', medicineSchema);

module.exports = MedicineInfo;