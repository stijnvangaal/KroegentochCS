var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Races = mongoose.model('Race');

function getRaces(req, res) {
    res.render('races',
        {title: 'Races', scripts: ['jquery.min', 'race']});
}

// ROUTING
router.route('/').get(getRaces);

module.exports = router;
