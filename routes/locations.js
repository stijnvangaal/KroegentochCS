var express = require('express');
var router = express.Router();
var https = require("https");
//var request = require('ajax-request');

var apiKey = "AIzaSyBZitnuOYBULr-V2UOhsfhmtfOpI7zvpqw";

/* GET location listing*/
router.get('/', function(req, res, next) {
    var key = 'AIzaSyBZitnuOYBULr-V2UOhsfhmtfOpI7zvpqw';

    var options = {
        host: 'maps.googleapis.com',
        path: '/maps/api/place/nearbysearch/json?location=51.6901,5.30062&type=cafe&radius=500&key=' + key
    }

    https.get(options, function (response) {
        var content = '';

        // Elke keer als we wat data terugkrijgen zullen we dit bij de content toevoegen.
        response.on('data', function (chunk) {
            content += chunk;
        });

        // Als het hele response terug is kunnen we verder
        response.on('end', function () {
            var object = JSON.parse(content);

            res.json(object);
        });
        //res.send(content)
    });
});

// /* GET location listing*/
// router.get('/', function (req, res) {
//     console.log("Start searching locations by name 'paul'");
//     request("http://maps.googleapis.com/maps/api/place/nearbysearch/json?key="+apiKey+"&location=51.6900,5.300&radius=1000&type=cafe", function(err, res1, body){
//         console.log("err = " + err);
//         console.log("res1 = " + res1);
//         console.log("body = " + body);
//         res.send(res1);
//     });
// });

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
