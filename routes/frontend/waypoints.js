var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Waypoints = mongoose.model('Waypoint');

function getRaces(req, res) {
    res.render('waypoints', {
        title: 'Waypoints', scripts: ['jquery.min', 'waypoint']
    });
}

// ROUTING
router.route('/').get(getRaces);

module.exports = router;
