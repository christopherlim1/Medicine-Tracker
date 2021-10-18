const mongoose = require('mongoose');
const MedicineInfo = require('../models/medicineInfo.js');
const CustomerInfo = require('../models/customerInfo.js');

// GET /medicine/:customer
exports.getMedicine = async (req, res) => {
    try {
        const customerID = req.params.customer;
        const myCustomer = await CustomerInfo.findById(customerID);
        res.status(200).json(myCustomer.medicineArray);
    } catch(error) {
        res.status(404).json({message: error.messasge});
    }
};

// POST /medicine/:customer
exports.createMedicine = async (req, res) => {
    try {
        const newMedicine = new MedicineInfo(req.body);
        const customerID = req.params.customer;
        const myCustomer = await CustomerInfo.findById(customerID);
        await newMedicine.save();
        req.body['id'] = newMedicine._id;
        myCustomer['medicineArray'].push(req.body);
        await myCustomer.save();
        res.status(201).json(req.body);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
};

