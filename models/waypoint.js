var mongoose = require('mongoose');

var waypointSchema = mongoose.Schema({
    id: Number,
    name: String,
    locationID: Number
});

var Waypoint = mongoose.model('Waypoint', waypointSchema);
module.exports = Waypoint;

