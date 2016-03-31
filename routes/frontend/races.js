var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Races = mongoose.model('Race');

function getRaces(req, res) {
    Races.find({})
        .populate("owner")
        .populate("users")
        .exec(function (err, races) {
            userId = 10; // TODO dummy data. Change this to the id of the currently logged in user.
            if (err) {
                res.render('races', {title: 'Races', 'races': {}, 'userId': userId});
            } else {
                res.render('races', {title: 'Races', 'races': races, 'userId': userId});
            }
        });
}

// ROUTING
router.route('/').get(getRaces);

module.exports = router;
