var mongoose = require('mongoose');

var raceSchema = mongoose.Schema({
    id: Number,
    title: String,
    owner: String,
    waypoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'Waypoint'}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var Race = mongoose.model('Race', raceSchema);
module.exports = Race;
