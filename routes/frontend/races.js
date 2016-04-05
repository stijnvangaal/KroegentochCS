var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

function getRaces(req, res){
    var user = req.user;
    if (user == undefined){
        // res.redirect('/');
        res.sendStatus(401);
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
