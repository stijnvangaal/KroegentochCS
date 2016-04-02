var express = require('express');
var router = express.Router();


function index(req, res){
    var user;
    if (req.user != undefined){
        user = req.user.local;
    }
    res.render('index', { title: 'Kroegentocht CS' , user: user});
}

// ROUTING
router.route('/').get(index);

// export module
module.exports = router;
