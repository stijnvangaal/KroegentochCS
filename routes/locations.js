var express = require('express');
var router = express.Router();
var https = require("https");
//var request = require('ajax-request');

var apiKey = "AIzaSyBZitnuOYBULr-V2UOhsfhmtfOpI7zvpqw";

function getLocations(req, res) {
    var options = {
        host: 'maps.googleapis.com',
        path: '/maps/api/place/nearbysearch/json?location=51.6901,5.30062&type=cafe&radius=500&key=' + apiKey
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
}

function addLocation(req, res) {
// supported?
}

function getLocation(req, res) {
//todo
}

function updateLocation(req, res) {
// supported?
}

function deleteLocation(req, res) {
    // supported?
}


// ROUTING
router.route('/')
    .get(getLocations)
    .put(addLocation);

router.route('/:id')
    .get(getLocation)
    .post(updateLocation)
    .delete(deleteLocation)


// export module
module.exports = router;
