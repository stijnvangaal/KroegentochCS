var useRoutes = function (app) {
    var index = require('./index.js');
    var races = require('./races.js');
    var waypoints = require('./waypoints.js');
    var locations = require('./locations.js');
    var users = require('./users.js');
    app.use('/', index)
    app.use('/races', races);
    app.use('/waypoints', waypoints);
    app.use('/users', users);
    app.use('/locations', locations);
};

module.exports = useRoutes;