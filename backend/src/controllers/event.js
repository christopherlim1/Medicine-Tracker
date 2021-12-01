const MedicineInfo = require('../models/medicineInfo.js');

// UPDATE /v0/event/update/:googleID/:eventID
exports.updateEvent = async (req, res) => {
    console.log(req.params.googleID);
    console.log(req.params.eventID);
    const googleID = req.params.googleID;
    const Medicine = await MedicineInfo.find({ googleID: googleID });
    let event = {};
    let index = 0;
    let eventsArray = [];
    for(let i = 0; i < Medicine.length; i++) {
        for(let j = 0; j < Medicine[i]['events'].length; j++) {
            if(Medicine[i]['events'][j]['id'] == req.params.eventID) {
                index = i;
                event = Medicine[i]['events'][j];
                Medicine[i]['events'][j]['taken'] = req.body.taken;
                eventsArray = Medicine[index].events;
            }
        }
    }
    Medicine[index].events = [];
    Medicine[index].events = eventsArray;
    Medicine[index].save();
    console.log(Medicine[index]);
    res.status(201).json(Medicine);
};