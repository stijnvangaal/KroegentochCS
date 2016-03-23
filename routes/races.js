var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Races = mongoose.model('Race');


function getRaces(req, res) {
    Races.find({}, function (err, races) {
        if (err) throw err;

        res.json(races);
        console.log(races);
    });
}

function addRace(req, res) {
    newRace = {} // TODO: read request and generate object
    newRace.save(function (err) {
        if (err) throw err;

        console.log('Race created!');
    });
}

function getRace(req, res) {
    Races.findById(req.param.id, function (err, race) {
        if (err) throw err;

        res.json(race);
        console.log(race);
    });
}

function updateRace(req, res) {
    // Races.findByIdAndUpdate(req.param.id, /* TODO  INSERT NEW OBJECT*/, function (err, race) {
    //     if (err) throw err;

    //     console.log(race);
    // });
}

function deleteRace(req, res) {
    Races.findByIdAndRemove(req.param.id, function (err) {
        if (err) throw err;

        console.log('Race deleted!');
    });
}


// ROUTING
router.route('/')
    .get(getRaces)
    .put(addRace);

router.route('/:id')
    .get(getRace)
    .post(updateRace)
    .delete(deleteRace)


module.exports = router;
