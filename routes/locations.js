var express = require('express');
var router = express.Router();

function getLocations(req, res) {
    // $.get("https://maps.googleapis.com/maps/api/place/textSearch/json?key=AIzaSyBZitnuOYBULr-V2UOhsfhmtfOpI7zvpqw&query=paul", function (result, success) {
    //     res.send(result);
    // });
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
