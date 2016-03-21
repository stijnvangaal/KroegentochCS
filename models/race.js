var mongoose = require('mongoose');

var raceSchema = mongoose.Schema({
    id: Number,
    title: String,
    owner: String,
    waypoints: [{waypointId: Number}],
    users: [{userId: Number}]
});

var Race = mongoose.model('Race', raceSchema);
module.exports = Race;
