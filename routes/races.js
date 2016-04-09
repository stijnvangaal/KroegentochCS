var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Races = mongoose.model('Race');
var Waypoints = mongoose.model('Waypoint');

function getRaces(req, res){
    Races.find({})
        .populate("owner")
        .populate("users")
        .exec(function(err, races){
            if (err){
                console.log(err);
                res.send("Failed to get races");
            } else{
                res.json(races);
            }
        });
}

function addRace(req, res){
    console.log("POSTRACE");
    // if (!req.isAuthenticated()){
    //     res.send(401);
    // } else{
        var title = req.body.title;
        // var owner = req.user;
        // spoof owner for BMD2
        var owner = "57091fb62c58bc11000f8e55";
        var newRace = new Races({
            title: title,
            owner: owner
        });

        newRace.save(function(err, result){
            if (err){
                console.log(err);
                res.send("Failed to add race");
            } else{
                console.log(result);
                res.send(result);
            }
        });
    // }

}

function getRace(req, res){
    Races.findOne({"_id": req.params.id})
        .populate("owner")
        .populate("users")
        .populate("waypoints")
        .exec(function(err, race){
            if (err){
                console.log(err);
                res.send("Failed to get race");
            } else{
                res.json(race);
                console.log(race);
            }
        });
}

function updateRace(req, res){
    // if (!req.isAuthenticated()){
    //     res.send(401);
    // } else{
        // check if it's your own race
        // Races.findOne({"_id": req.params.id}).populate("owner").exec(function(err, oldRace){
        //     if (!err){
        //         if (String(oldRace.owner._id) !== String(req.user._id)){
        //             res.send(403, "you can only update your own races");
        //             return;
        //         }

                // update the race
                var newTitle = req.body.title;
                var newStartedStatus = req.body.started;
                if (newTitle){
                    var newData = {title: newTitle, started: newStartedStatus};
                } else{
                    var newData = {started: newStartedStatus}
                }
                Races.findByIdAndUpdate(req.params.id, newData, {new: true}, function(err, race){
                    if (err){
                        console.log(err);
                        res.send("Failed to update race");
                    } else{
                        console.log(race);
                        res.json(race);
                    }
                });
            // } else{
            //     res.statusCode = 304;
            //     res.send("No value modified");
            // }
        // });
    // }
}

function deleteRace(req, res){
    // if (!req.isAuthenticated()){
    //     res.send(401);
    // } else{
        // check if it's your own race
        // Races.findOne({"_id": req.params.id}).populate("owner").exec(function(err, oldRace){
        //     if (!err){
        //         if (String(oldRace.owner._id) !== String(req.user._id)){
        //             res.send(403, "you can only delete your own races");
        //             return;
        //         }

                // dalete the race
                Races.findByIdAndRemove(req.params.id, function(err){
                    if (err){
                        console.log(err);
                        res.send("Failed to delete race");
                    } else{
                        console.log('Race deleted!');
                        res.send("Race successfully deleted");
                    }
                });
        //     }
        // });
    // }
}

function addUsers(req, res){
    console.log(req.body);
    if (req.body.userId){
        var newUsers = req.body.userId;
    } else{
        var newUsers = req.body.userIds;
    }

    if (newUsers != undefined){
        var userData = {};
        if (typeof newUsers === 'string'){
            userData = {$push: {users: newUsers}};
        } else{
            userData = {$push: {users: {$each: newUsers}}};
        }

        // // find out if the user is already in the race
        // var duplicate = false;
        // Races.findOne({"_id": req.params.id})
        //     .populate("users")
        //     .select("users -_id")
        //     .exec(function(err, data){
        //         duplicateCheck:
        //             for (var i = 0; i < data.users.length; i++){
        //                 if (typeof newUsers == 'string'){
        //                     if (String(newUsers) == String(data.users[i]._id)){
        //                         duplicate = true;
        //                         break duplicateCheck;
        //                     }
        //                 } else{ // is array
        //                     for (var user_id in userData){
        //                         if (String(userData) == String(data.users[i]._id)){
        //                             duplicate = true;
        //                             break duplicateCheck;
        //                         }
        //                     }
        //                 }
        //             }
        //         if (!duplicate){

                    // add the user
                    Races.findByIdAndUpdate(req.params.id, userData, {new: true}, function(err, race){
                        if (err){
                            console.log(err);
                            res.send(500, "Failed to add user(s)");
                        } else if (!race){
                            res.send(404, "Race not found");
                        } else{
                            console.log(race);
                            res.json(race);
                        }
                    });
    //             } else{
    //                 res.send("This user is already participating");
    //             }
    //         });
    } else{
        res.statusCode = 304;
        res.send("No value modified");
    }
}

function getUsers(req, res){
    Races.findOne({"_id": req.params.id})
        .populate("users")
        .select("users -_id")
        .exec(function(err, users){
            if (err){
                console.log(err);
                res.send("Failed to get users");
            } else{
                res.json(users);
                console.log(users);
            }
        });
}

function deleteUser(req, res){
    // if (!req.isAuthenticated()){
    //     res.send(401);
    // } else{
        // if the user is removing yourself
        // var removingSelf = req.params.userId == String(req.user._id);

        // Races.findOne({"_id": req.params.id}).populate("owner").exec(function(err, oldRace){
        //     if (!err){
        //         if (String(oldRace.owner._id) !== String(req.user._id) && !removingSelf){ // if not the owner and not removing himself
        //             res.send(403, "You can only delete yourself if you're not the owner of the Race");
        //             return;
        //         }
                Races.findByIdAndUpdate(req.params.id, {$pull: {users: req.params.userId}}, {new: true}, function(err, race){
                    if (err){
                        console.log(err);
                        res.send("Failed to remove user");
                    } else{
                        console.log(race);
                        res.json(race);
                    }
                });
            // }
        // });
    // }
}

function addWaypoints(req, res){
    // if (!req.isAuthenticated()){
    //     res.send(401);
    // } else{
        // check if it's your own race and if the waypoint is unique in the race.
        // Races.findOne({"_id": req.params.id}).populate("owner").exec(function(err, oldRace){
        //         if (!err){
        //             if (String(oldRace.owner._id) !== String(req.user._id)){
        //                 res.send(403, "you can only alter your own races");
        //                 return;
        //             }
                    var newpoints = req.body.waypoints;

                    // // Dublicate detection:
                    // for (var key in oldRace.waypoints){
                    //     if (typeof newpoints == 'string'){
                    //         console.log(String(oldRace.waypoints[key]) + " + " + newpoints);
                    //         if (String(oldRace.waypoints[key]) == newpoints){
                    //             res.send(409, 'waypoint already exists in the race');
                    //         }
                    //     } else{
                    //         var nonDuplicatePoints;
                    //         for (var newpoint in newpoints){
                    //             if (String(oldRace.waypoints[key]) == newpoint){
                    //                 nonDuplicatePoints += newpoint;
                    //             }
                    //         }
                    //         newpoints = nonDuplicatePoints;
                    //         if (newpoints.length == 0){
                    //             res.send(409, 'All waypoints already exist in the race');
                    //         }
                    //     }
                    // }


                    if (newpoints != undefined){
                        var pointData = {};
                        if (typeof newpoints === 'string'){
                            pointData = {$push: {waypoints: newpoints}};
                        }
                        else{
                            pointData = {$push: {waypoints: {$each: newpoints}}};
                        }
                        Races.findByIdAndUpdate(req.params.id, pointData, {new: true}, function(err, race){
                            if (err){
                                console.log(err);
                                res.send("Failed to add waypoint(s)");
                            } else{
                                console.log(race);
                                res.json(race);
                            }
                        });
                    } else{
                        res.statusCode = 304;
                        res.send("No value modified");
                    }
    //             }
    //         }
    //     );
    // }
}

function deleteWaypoint(req, res){
    // if (!req.isAuthenticated()){
    //     res.send(401);
    // } else{
        // check if it's your own race
        // Races.findOne({"_id": req.params.id}).populate("owner").exec(function(err, oldRace){
        //     if (!err){
        //         if (String(oldRace.owner._id) !== String(req.user._id)){
        //             res.send(403, "you can only alter your own Races");
        //             return;
        //         }
                Races.findByIdAndUpdate(req.params.id, {$pull: {waypoints: req.params.pointId}}, function(err, race){
                    if (err){
                        console.log(err);
                        res.send("Failed to remove waypoint");
                    } else{
                        console.log(race);
                        res.json(race);
                    }
                });
    //         }
    //     });
    // }
}

function addCheckedinUser(req, res){
    // if (!req.isAuthenticated()){
    //     res.send(401);
    // } else{
        var userId = req.body.userId;
        var waypointId = req.params.waypoint_id;
        
        // var checkingInSelf = userId == String(req.user._id);
        // if (!checkingInSelf){
        //     res.send(403, "you can only alter your own status");
        // } else{


            // checkin the user
            Waypoints.findByIdAndUpdate(waypointId, {$push: {checkedInUsers: userId}}, function(err, wp){
                if (err){
                    console.log(err);
                    res.send("Failed to update checkedin status");
                } else{
                    console.log(wp);
                    res.json(wp);
                }
            });
    //     }
    // }
}

function getCheckedinUsers(req, res){
    // if (!req.isAuthenticated()){
    //     res.send(401);
    // } else{
        var waypointId = req.params.waypoint_id;
        // get all races.
        // foreach
        // if
        Races.find({}).exec(function(err, races){
            if (err){
                console.log(err);
                res.send("Failed to get races");
            } else{
                if(!races.started){
                    res.send(403,"This race has not been started yet.");
                }
            }
        });

        Waypoints.findOne({"_id": waypointId})
            .populate("checkedInUsers").select("checkedInUsers")
            .exec(function(err, users){
                if (err){
                    console.log(err);
                    res.send("Failed to get checked in users");
                } else{
                    res.json(users);
                    console.log(users);
                }
            });
    // }
}

// ROUTING
router.route('/')
    .get(getRaces)
    .post(addRace);

router.route('/:id')
    .get(getRace)
    .put(updateRace)
    .delete(deleteRace);


router.route('/:id/users')
    .get(getUsers)
    .post(addUsers);

router.route('/:id/users/:userId')
    .delete(deleteUser);


router.route('/:id/waypoints')
    .post(addWaypoints);
router.route('/:id/waypoints/:pointId')
    .delete(deleteWaypoint);


router.route('/:race_id/waypoints/:waypoint_id/checkedInUsers')
    .post(addCheckedinUser)
    .get(getCheckedinUsers);

module.exports = router;