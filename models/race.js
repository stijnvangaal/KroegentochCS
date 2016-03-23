var mongoose = require('mongoose');

var raceSchema = mongoose.Schema({
    title: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    waypoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'Waypoint'}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var Race = mongoose.model('Race', raceSchema);
module.exports = Race;
