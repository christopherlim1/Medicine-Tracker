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

exports.getCustomer = async (req, res) => {
    try {
        const customerID = req.params.customer;
        const customer = await CustomerInfo.find({googleID: customerID})
        res.status(201).json(customer);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
}