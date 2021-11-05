const CustomerInfo = require('../models/customerInfo.js');

// POST /customer/:googleID
exports.createCustomer = async (req, res) => {
    const googleID = req.params.googleID;
    const customer = await CustomerInfo.find({googleID: googleID});
    if(customer[0] != undefined) {
        res.status(201).json(customer[0]);
    } else {
        const newCustomer = new CustomerInfo();
        newCustomer['googleID'] = googleID;
        await newCustomer.save();
        res.status(201).json(newCustomer);
    }
};