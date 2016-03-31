var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Waypoints = mongoose.model('Waypoint');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function getWaypoints(req, res) {
    Waypoints.find({}, function (err, waypoints) {
        if (err) throw err;

        res.json(waypoints);
        console.log(waypoints);
    });
}

function addWaypoint(req, res) {
    newWaypoint = {}; // TODO: read request and generate object
    newWaypoint.save(function (err) {
        if (err) throw err;

        console.log('User created!');
    });
}

function getWaypoint(req, res) {
    Waypoints.findById(req.param.id, function (err, waypoint) {
        if (err) throw err;

        res.json(waypoint);
        console.log(waypoint);
    });
}

function updateWaypoint(req, res) {
    // Waypoints.findByIdAndUpdate(req.param.id, /* TODO  INSERT NEW OBJECT*/, function (err, waypoint) {
    //     if (err) throw err;

    //     console.log(waypoint);
    // });
}

function deleteWaypoint(req, res) {
    Waypoints.findByIdAndRemove(req.param.id, function (err) {
        if (err) throw err;
        console.log('Waypoint deleted!');
    });
}


// ROUTING
router.route('/')
    .get(getWaypoints)
    .post(addWaypoint);

router.route('/:id')
    .get(getWaypoint)
    .post(updateWaypoint)
    .delete(deleteWaypoint);


// export module
module.exports = router;
