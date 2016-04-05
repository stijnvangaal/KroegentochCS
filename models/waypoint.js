var mongoose = require('mongoose');
var waypointSchema = mongoose.Schema({
    name: {type: String, required: true},
    vicinity: {type: String, required: true},
    placeId: {type: String, required: true, unique: true, index: true},
    checkedInUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true}]
});

var Waypoint = mongoose.model('Waypoint', waypointSchema);
module.exports = Waypoint;

