var mongoose = require('mongoose');

var completionSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    waypoint: {type: mongoose.Schema.Types.ObjectId, ref: 'Waypoint'},
    race: {type: mongoose.Schema.Types.ObjectId, ref: 'Race'}
});

var Race = mongoose.model('Completion', completionSchema);
module.exports = Race;
