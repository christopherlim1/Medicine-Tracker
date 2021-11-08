const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    id: String,
    title: String,
    groupid: String,
    start: String,
    end: String,
    allDay: Boolean,
    editable: Boolean,
    display: String,
    daysOfWeek: [String], // Not sure if this is the right declaration
    startTime: String,
    endTime: String,
    // startRecur: ,
    // endRecur: ,

});

const EventInfo = mongoose.model('EventInfo', eventSchema);

module.exports = EventInfo;