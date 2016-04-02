var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Races = mongoose.model('Race');

function getRaces(req, res) {
    var user;
    if (req.user == undefined) {
        // res.redirect('/');
        res.sendStatus(403);
        return;
    }
    
    res.render('races', {
        title: 'Races',
        scripts: ['jquery.min', 'race'],
        user: user
    });
}

// ROUTING
router.route('/').get(getRaces);

module.exports = router;
