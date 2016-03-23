var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = mongoose.model('User');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function getUsers(req, res) {
    Users.find({}, function (err, users) {
        if (err){
            console.log(err);
            res.send("Get users failed");
        }
        else{
            res.json(users)
            console.log(users);  
        }
    });
}

function addUser(req, res) {
    var name = req.body.name;
    var pass = req.body.pass;
    
    if(name == undefined || pass == undefined){
        res.writeHead(400, {'Content-Type' : 'text/plain'});
        res.end('Invalid data');
    }
    else{
        newUser = new Users({name : name, password : pass});
        console.log(newUser);
        newUser.save(function (err) {
            if (err){
                console.log(err);
                res.statusCode = 400;
                res.send("User creation failed");
            }
            else{
                console.log('User created!');
                res.send("User created");
            }
        });
    }
}

function getUser(req, res) {
    Users.findById(req.params.id, function (err, user) {
        if (err){
            console.log(err);
            res.send("Get user failed");
        }
        else{
            res.json(user);
            console.log(user);
        }
    });
}

function updateUser(req, res) {
    var newName = req.body.name;
    var newPass = req.body.pass;
   
    if(newName != undefined || newPass != undefined){
        var updatedObj = {};
        if(newName != undefined){
            updatedObj.name = newName;
        }
        if(newPass != undefined){
            updatedObj.password = newPass;
        }
        console.log("update: " + updatedObj);
        Users.findByIdAndUpdate(req.params.id, updatedObj, {new: true} , function (err, user) {
            if (err){
                console.log(err);
                res.statusCode = 400;
                res.send("User update failed");
            }
            else{
                res.send(user);
            }
        });
    }
    else{
        res.statusCode = 304;
        res.send("No Update made");
    }
}

function deleteUser(req, res) {
    Users.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.send("User deletion failed");
        }
        else{
            console.log('User deleted!');
            res.json("User deleted!");
        }
    });
}


// ROUTING
router.route('/')
    .get(getUsers)
    .post(addUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)


// export module
module.exports = router;
