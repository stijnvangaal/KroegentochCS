var express = require('express');
var router = express.Router();
var https = require("https");


var apiKey = "AIzaSyBZitnuOYBULr-V2UOhsfhmtfOpI7zvpqw";
var textSearch = "/maps/api/place/textSearch/json?type=cafe&key=" + apiKey;
var nearbySearch = "/maps/api/place/nearbySearch/json?";
var searchRadius = 500;

function getLocations(req, res) {
    var searchString = "";
    var searchLng = 5.28664;
    var searchLat = 51.68852;
    var searchText = "Subway";

    //if(searchText != undefined){
        searchString = textSearch + "&name=" + searchText;
    //}
    //else if(searchLng != undefined && searchLat != undefined){
        searchString = nearbySearch + "location=" + searchLat + "," + searchLng + "&radius=" + searchRadius + "&name=" + searchText + "&key=" + apiKey;   
    //}

    var options = {
        host: 'maps.googleapis.com',
        path: searchString
    };

    https.get(options, function (response) {
        var content = '';

        // Elke keer als we wat data terugkrijgen zullen we dit bij de content toevoegen.
        response.on('data', function (chunk) {
            content += chunk;
        });

        // Als het hele response terug is kunnen we verder
        response.on('end', function () {
            console.log(content)
            var object = JSON.parse(content);

            res.json(object);
        });
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
