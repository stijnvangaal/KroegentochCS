var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Waypoints = mongoose.model('Waypoint');
var Races = mongoose.model('Race');

function getWaypoints(req, res){
    if (req.user == undefined){
        // res.redirect('/');
        res.sendStatus(401);
        return;
    }

    // read req.query.id
    var raceId = req.query.id;
    // check Races if its yours, no? 403
    //res.sendStatus(401);
    // yes? continue and add id to res.render


    var user = req.user.local;
    res.render('waypoints', {
        title: 'Waypoints', scripts: ['jquery.min', 'waypoint'],
        raceId: raceId,
        user: user
    });
}

// ROUTING
router.route('/').get(getWaypoints);

module.exports = router;
