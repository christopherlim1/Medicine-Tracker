const CustomerInfo = require('../models/customerInfo.js');

// POST /customer/:googleID
exports.createCustomer = async (req, res) => {
    try {
        const newCustomer = new CustomerInfo(req.body);
        newCustomer['googleID'] = req.params.googleID;
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
};

// GET /customer/:googleID
exports.getCustomer = async (req, res) => {
    try {
        const googleID = req.params.googleID;
        const customer = await CustomerInfo.find({googleID: googleID})
        res.status(200).json(customer[0]);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
}