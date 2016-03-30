var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Races = mongoose.model('Race');

function getRaces(req, res) {
    Races.find({})
        .populate("owner")
        .populate("users")
        .exec(function (err, races) {
            userId = 10; // TODO dummy data. Change this to the id of the currently logged in user.
            if (err) {
                console.log(err);
                res.send("Failed to get races");
                res.render('races', {title: 'Races', 'races': {}, 'userId': userId});
            } else {
                // res.json(races);
                console.log(races);
                res.render('races', {title: 'Races', 'races': races, 'userId': userId });
            }
        });
}

function addRace(req, res) {
    var title = req.body.title;
    var ownerId = req.body.ownerId;

    newRace = new Races({
        title: title,
        owner: ownerId
    });
    newRace.save(function (err, result) {
        if (err) {
            console.log(err);
            res.send("Failed to add race");
        } else {
            console.log(result);
            res.send(result);
        }
    });
}

function getRace(req, res) {
    Races.find({"_id": req.params.id})
        .populate("owner")
        .populate("users")
        .populate("waypoints")
        .exec(function (err, race) {
            if (err) {
                console.log(err);
                res.send("Failed to get race");
            } else {
                res.json(race);
                console.log(race);
            }
        });
    // Races.findById(req.params.id, function (err, race) {
    //     if (err){
    //         console.log(err);
    //         res.send("Failed to get race");
    //     } else {
    //         res.json(race);
    //         console.log(race);
    //     }
    // });
}

function updateRace(req, res) {
    var newTitle = req.body.title;
    var newUsers = req.body.users;
    var newPoints = req.body.points;

    if (newTitle != undefined && newUsers != undefined && newPoints != undefined) {
        var searchObj = {};
        console.log("title=" + newTitle);
        console.log("users=" + newUsers);
        console.log("points=" + newPoints);
        searchObj.title = newTitle;
        // searchObj.users = {$push}

        // Races.findByIdAndUpdate(req.params.id, /* TODO  INSERT NEW OBJECT*/, function (err, race) {
        //     if (err) throw err;

        //     console.log(race);
        // });
        res.statusCode = 304;
        res.send("No value modified");
    } else {
        res.statusCode = 304;
        res.send("No value modified");
    }
}

function deleteRace(req, res) {
    Races.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.send("Failed to delete race");
        } else {
            console.log('Race deleted!');
            res.send("Race successfully deleted");
        }
    });
}


// ROUTING
router.route('/')
    .get(getRaces)
    .put(addRace);

router.route('/:id')
    .get(getRace)
    .post(updateRace)
    .delete(deleteRace);


module.exports = router;
