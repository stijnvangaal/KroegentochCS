var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Waypoints = mongoose.model('Waypoint');

function getWaypoints(req, res) {
    var user;
    if (req.user == undefined) {
        // res.redirect('/');
        res.sendStatus(403);
        return;
    }
    
    user = req.user.local;
    res.render('waypoints', {
        title: 'Waypoints', scripts: ['jquery.min', 'waypoint'],
        user: user
    });
}

// ROUTING
router.route('/').get(getWaypoints);

module.exports = router;
