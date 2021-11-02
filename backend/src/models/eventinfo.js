const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    googleID: String,
    title: String,
});

const EventInfo = mongoose.model('EventInfo', eventSchema);

module.exports = EventInfo;