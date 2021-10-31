const CustomerInfo = require('../models/customerInfo.js');
const MedicineInfo = require('../models/medicineInfo.js');

// GET /medicine/:googleID
exports.getMedicine = async (req, res) => {
    const googleID = req.params.googleID;
    const myMedicine = await MedicineInfo.find({googleID: googleID});
    if(myMedicine.length > 0) {
        res.status(200).json(myMedicine);
    } else {
        res.status(404).send();
    }
};

// POST /medicine/:googleID
exports.createMedicine = async (req, res) => {
    try {
        const googleID = req.params.googleID;
        const newMedicine = new MedicineInfo(req.body);
        newMedicine['googleID'] = googleID;
        await newMedicine.save();
        res.status(201).json(newMedicine);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
};

// DELETE /medicine/:medicineID
exports.deleteMedicine = async (req, res) => {
    await MedicineInfo.findByIdAndRemove(req.params.medicineID);
    res.status(200).send('Medicine is Deleted');
};
