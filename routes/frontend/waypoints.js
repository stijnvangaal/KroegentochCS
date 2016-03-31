var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Waypoints = mongoose.model('Waypoint');

function getRaces(req, res) {
    Waypoints.find({})
        // .populate("owner")
        // .populate("users")
        .exec(function (wayp_err, waypoints) {
            if (wayp_err) {
                waypoints = {};
            }
            // Locations.find({}).exec(function (loc_err, locations) {
            //     if (loc_err) {
            //         locations = {};
            //     }
            res.render('waypoints', {title: 'Waypoints', 'waypoints': waypoints});
            // });
        });
}

// ROUTING
router.route('/').get(getRaces);

module.exports = router;
