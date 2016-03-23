var mongoose = require('mongoose');
var waypointSchema = mongoose.Schema({
    name: String,
    locationID: Number
});

var Waypoint = mongoose.model('Waypoint', waypointSchema);
module.exports = Waypoint;

