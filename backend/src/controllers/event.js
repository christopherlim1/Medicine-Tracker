const CustomerInfo = require('../models/customerInfo.js');
const EventInfo = require('../models/eventInfo.js');

// GET /event/:googleID
exports.getMedicine = async (req, res) => {
    const googleID = req.params.googleID;
    const myEvent = await EventInfo.find({googleID: googleID});
    if(myEvent.length > 0) {
        res.status(200).json(myEvent);
    } else {
        res.status(404).send();
    }
};