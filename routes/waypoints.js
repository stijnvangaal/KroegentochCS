var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Waypoints = mongoose.model('Waypoint');

function getWaypoints(req, res) {
    Waypoints.find({}, function (err, waypoints) {
        if (err){
            console.log(err);
            res.send("Failed to get waypoints");
        }
        else{
            res.json(waypoints);
            console.log(waypoints);   
        }
    });
}

function addWaypoint(req, res) {
    var placeId = req.body.placeId;
    var name = req.body.name;
    var vicinity = req.body.vicinity;
    
    if(placeId != undefined && name != undefined && vicinity != undefined){
        newWaypoint = new Waypoints({ placeId : placeId, name : name, vicinity : vicinity});
        newWaypoint.save(function (err, waypoint) {
            if (err) {  
                console.log(err);
                res.send("failed to add waypoint");
            }
            else{
                console.log('Waypoint added!');
                res.json(waypoint); 
            }
        });
    }else{
        res.writeHead(400, {'Content-Type' : 'text/plain'});
        res.end('Invalid data');
    }
}

//Better to use locations/:placeId
function getWaypoint(req, res) {
    Waypoints.findById(req.params.id, function (err, waypoint) {
        if (err){
            console.log(err);
            res.send("Failed to get waypoint")
        }
        else{
            res.json(waypoint);
            console.log(waypoint);   
        }
    });
}

function updateWaypoint(req, res) {
    var name = req.body.name;
    var vicinity = req.body.vicinity;
    
    if(name != undefined || vicinity != undefined ){
        var updateData = {};
        if(name != undefined){ updateData.name = name; }
        if(vicinity != undefined){updateData.vicinity = vicinity; }
        
        Waypoints.findByIdAndUpdate(req.params.id, updateData, {new: true}, function (err, waypoint) {
            if (err){
                console.log(err);
                res.send("failed to update waypoint");
            }else{
                console.log(waypoint);
                res.json(waypoint);   
            }
        });
    }else{
        res.statusCode = 304;
        res.send("No Update made");
    }
}

function deleteWaypoint(req, res) {
    Waypoints.findByIdAndRemove(req.params.id, function (err) {
        if (err){
            console.log(err);
            res.send("Failed to delete waypoint");
        }else{
            console.log('Waypoint deleted!');
            res.send("Waypoint deleted");
        }
    });
}


// ROUTING
router.route('/')
    .get(getWaypoints)
    .post(addWaypoint);

router.route('/:id')
    .get(getWaypoint)
    .put(updateWaypoint)
    .delete(deleteWaypoint);


// export module
module.exports = router;