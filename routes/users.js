var express = require('express');
var router = express.Router();

/* GET users listing*/
router.get('/', function (req, res) {
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        req.json(users)
        console.log(users);
    });

});

/* GET users with id*/
router.get('/:id', function (req, res) {


});

/* POST users */
router.post('/', function(req, res){
    
});

/* PUT users */
router.put('/:id', function(req, res){
    
});

/* DELETE users */
router.delete('/:id', function(req, res){
    
});

module.exports = router;
