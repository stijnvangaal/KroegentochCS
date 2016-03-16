var express = require('express');
var router = express.Router();


/* GET location listing*/
router.get('/', function (req, res) {
    $.get("https://maps.googleapis.com/maps/api/place/textSearch/json?key=AIzaSyBZitnuOYBULr-V2UOhsfhmtfOpI7zvpqw&query=paul", function(result, success){
        res.send(result);
    });
});

/* GET location with id*/
router.get('/:id', function (req, res) {


});

/* POST location */
router.post('/', function(req, res){

});

/* PUT location */
router.put('/:id', function(req, res){

});

/* DELETE location */
router.delete('/:id', function(req, res){

});

module.exports = router;
