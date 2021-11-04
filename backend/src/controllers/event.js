const CustomerInfo = require('../models/customerInfo.js');
const EventInfo = require('../models/eventInfo.js');

// GET /event/:googleID
exports.getEvent = async (req, res) => {
    const googleID = req.params.googleID;
    const myEvent = await EventInfo.find({googleID: googleID});
    if(myEvent.length > 0) {
        res.status(200).json(myEvent);
    } else {
        res.status(404).send();
    }
};

// POST /event/:googleID
exports.createEvent = async (req, res) => {
    try {
        const googleID = req.params.googleID;
        const newEvent = new EventInfo(req.body);
        newEvent['googleID'] = googleID;
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
};

// DELETE /event/:eventID
exports.deleteEvent = async (req, res) => {
    await EventInfo.findByIdAndRemove(req.params.eventID);
    res.status(200).send('Event is Deleted');
};

// UPDATE /event/:id
exports.updateEvent = async (req, res) => {
    const Event = await EventInfo.findById(req.params.eventID);
    Event.title = req.body.title;
    Event.save();
    res.status(201).json(Event);
};