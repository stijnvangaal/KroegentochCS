var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Races = mongoose.model('Race');

function getRaces(req, res) {
    Races.find({})
        .populate("owner")
        .populate("users")
        .exec(function (err, races) {
            if (err) {
                console.log(err);
                res.send("Failed to get races");
            } else {
                res.json(races);
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
    Races.findOne({"_id": req.params.id})
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
}

function updateRace(req, res) {
    var newTitle = req.body.title;

    if (newTitle != undefined) {
        var newData = { title : newTitle};
        Races.findByIdAndUpdate(req.params.id, newData, { new : true }, function (err, race) {
            if (err){
                console.log(err);
                res.send("Failed to update title");
            }else{
                console.log(race);
                res.json(race);
            }
        });
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

function addusers(req,res){
    var newUsers = req.body.userIds;

    if (newUsers != undefined) {
        var userData = {};
        if( typeof newUsers === 'string' ){ userData = {$push : { users : newUsers}}; }
        else{ userData = {$push : { users : { $each: newUsers} }}; }
        
        Races.findByIdAndUpdate(req.params.id, userData, { new : true }, function (err, race) {
            if (err){
                console.log(err);
                res.send("Failed to add user(s)");
            }else{
                console.log(race);
                res.json(race);
            }
        });
    } else {
        res.statusCode = 304;
        res.send("No value modified");
    }
}

function deleteUser(req, res){
    Races.findByIdAndUpdate(req.params.id, {$pull : { users : req.params.userId}}, { new : true }, function (err, race) {
        if (err){
            console.log(err);
            res.send("Failed to remove user");
        }else{
            console.log(race);
            res.json(race);
        }
    });
}

function addWaypoints(req,res){
    var newpoints = req.body.waypoints;

    if (newpoints != undefined) {
        var pointData = {};
        if( typeof newpoints === 'string' ){pointData = {$push : { waypoints : newpoints}}; }
        else{  pointData = {$push : { waypoints : { $each: newpoints} }}; }
        
        Races.findByIdAndUpdate(req.params.id, pointData, { new : true }, function (err, race) {
            if (err){
                console.log(err);
                res.send("Failed to add waypoint(s)");
            }else{
                console.log(race);
                res.json(race);
            }
        });
    } else {
        res.statusCode = 304;
        res.send("No value modified");
    }
}

function deleteWaypoint(req, res){
    Races.findByIdAndUpdate(req.params.id, {$pull : { waypoints : req.params.pointId}}, { new : true }, function (err, race) {
        if (err){
            console.log(err);
            res.send("Failed to remove waypoint");
        }else{
            console.log(race);
            res.json(race);
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

router.route('/:id/users')
    .post(addusers);
router.route('/:id/users/:userId')
    .delete(deleteUser);
    
router.route('/:id/waypoints')
    .post(addWaypoints);
router.route('/:id/waypoints/:pointId')
    .delete(deleteWaypoint);

module.exports = router;