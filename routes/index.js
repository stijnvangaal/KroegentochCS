var express = require('express');
var router = express.Router();


function index(req, res){
    res.render('index', { title: 'Kroegentocht CS' });
}

// ROUTING
router.route('/').get(index);

// export module
module.exports = router;
