var mongoose = require('mongoose');

var raceSchema = mongoose.Schema({
    title: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    waypoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'Waypoint', unique: true}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true}]
});

var Race = mongoose.model('Race', raceSchema);
module.exports = Race;
