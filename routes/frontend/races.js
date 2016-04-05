var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var io;

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

module.exports = function (socketio){
    io = socketio;
    // test_socket();
    return router;
};


function test_socket(){
    io.on('connection', function (socket) {
        socket.on('news_left', function () {
            console.log("NEWS IS LEFT!");
        });
    });
}