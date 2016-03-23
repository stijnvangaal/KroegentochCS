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
        if (err) throw err;

        res.json(users)
        console.log(users);
    });
}

function addUser(req, res) {
    newUser = {} // TODO: read request and generate object
    newUser.save(function (err) {
        if (err) throw err;

        console.log('User created!');
    });
}

function getUser(req, res) {
    Users.findById(req.param.id, function (err, user) {
        if (err) throw err;

        res.json(user);
        console.log(user);
    });
}

function updateUser(req, res) {
    // Users.findByIdAndUpdate(req.param.id, /* TODO  INSERT NEW OBJECT*/, function (err, user) {
    //     if (err) throw err;
        
    //     console.log(user);
    // });
}

function deleteUser(req, res) {
    Users.findByIdAndRemove(req.param.id, function (err) {
        if (err) throw err;
        console.log('User deleted!');
    });
}


// ROUTING
router.route('/')
    .get(getUsers)
    .put(addUser);

router.route('/:id')
    .get(getUser)
    .post(updateUser)
    .delete(deleteUser);


// export module
module.exports = router;
