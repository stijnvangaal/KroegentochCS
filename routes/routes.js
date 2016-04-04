var useRoutes = function (app, passport) {
    var index = require('./index.js');
    var races = require('./races.js');
    var waypoints = require('./waypoints.js');
    var locations = require('./locations.js');
    var users = require('./users.js');
    var manageRaces = require('./frontend/races.js');
    var manageWaypoints = require('./frontend/waypoints.js');
    app.use('/', index);
    app.use('/races', races);
    app.use('/waypoints', waypoints);
    app.use('/users', users);
    app.use('/locations', locations);
    app.use('/manageraces', manageRaces);
    app.use('/managewaypoints', manageWaypoints);
    
    app.post('/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true // allow flash messages
        }));
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true // allow flash messages
    }));
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    })
};

module.exports = useRoutes;