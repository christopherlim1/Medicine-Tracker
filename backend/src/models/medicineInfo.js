const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    googleID: String,
    name: String,
    description: String,
    frequency: Number,
    doses: Number,
    totalAmount: Number,
<<<<<<< Updated upstream
    events: [Object],
=======
    time: String,
>>>>>>> Stashed changes
});

const MedicineInfo = mongoose.model('MedicineInfo', medicineSchema);

module.exports = MedicineInfo;
