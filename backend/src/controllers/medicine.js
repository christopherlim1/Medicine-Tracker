const MedicineInfo = require('../models/medicineInfo.js');
const CustomerInfo = require('../models/customerInfo.js');

// GET /medicine/:googleID
exports.getMedicine = async (req, res) => {
    try {
        const googleID = req.params.googleID;
        const myCustomer = await CustomerInfo.find({googleID: googleID});
        res.status(200).json(myCustomer[0].medicineArray);
    } catch(error) {
        res.status(404).json({message: error.messasge});
    }
};

// POST /medicine/:googleID
exports.createMedicine = async (req, res) => {
    try {
        const newMedicine = new MedicineInfo(req.body);
        const googleID = req.params.googleID;
        const myCustomer = await CustomerInfo.find({googleID: googleID});
        await newMedicine.save();
        req.body['id'] = newMedicine._id;
        myCustomer[0].medicineArray.push(req.body);
        await myCustomer[0].save();
        res.status(201).json(req.body);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
};

