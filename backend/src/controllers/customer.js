const mongoose = require('mongoose');
const MedicineInfo = require('../models/medicineInfo.js');
const CustomerInfo = require('../models/customerInfo.js');

// POST /customer
exports.createCustomer = async (req, res) => {
    try {
        const newCustomer = new CustomerInfo(req.body);
        await newCustomer.save();
        res.status(201).json(req.body);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
};
