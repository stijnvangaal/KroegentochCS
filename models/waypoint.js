var mongoose = require('mongoose');
var waypointSchema = mongoose.Schema({
    name: String,
    placeId: Number,
    position: Number
});

var Waypoint = mongoose.model('Waypoint', waypointSchema);
module.exports = Waypoint;

