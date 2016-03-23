var express = require('express');
var router = express.Router();
var https = require("https");


var apiKey = "AIzaSyBZitnuOYBULr-V2UOhsfhmtfOpI7zvpqw";
//var textSearch = "/maps/api/place/textsearch/json?type=cafe&key=" + apiKey;
var nearbySearch = '/maps/api/place/nearbysearch/json?type=cafe&key=' + apiKey;
var detailSearch = '/maps/api/place/details/json?&key=' + apiKey;
var mainRadius = 5000;
var mainLng = 5.30207;//coords of 's hertogenbosch marktsplein
var mainLat = 51.68694;

function getLocations(req, res) {  
    var searchLng = mainLng
    var searchLat = mainLat;
    var searchRadius = mainRadius;
    var searchName = "";
    var pageToken = "";
    
    if(req.query.lng      != undefined){ searchlng    = req.query.lng; } 
    if(req.query.lat      != undefined){ searchLat    = req.query.lat; }
    if(req.query.raduis   != undefined){ searchRadius = req.query.radius; }
    if(req.query.name     != undefined){ searchName   = "&name=" + req.query.name; }
    if(req.query.pageToken != undefined){ pageToken   = "&pagetoken=" + req.query.pageToken; }
    
    var searchString = nearbySearch + "&location=" + searchLat + "," + searchLng + "&radius=" + searchRadius + searchName + pageToken;   

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
            var object = JSON.parse(content);

            res.json(object);
        });
    });
}

function getLocation(req, res) {
    var id = req.params.id;
    console.log(id);
    var searchString = detailSearch + "&placeid=" + id;
    console.log(searchString);  
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
                //console.log(content)
                var object = JSON.parse(content);

                res.json(object);
            });
        });
}


// ROUTING
router.route('/')
    .get(getLocations);

router.route('/:id')
    .get(getLocation);


// export module
module.exports = router;
