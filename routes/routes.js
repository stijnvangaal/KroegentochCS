var useRoutes = function (app) {
    var index           = require('./index.js');
    var races           = require('./races.js');
    var waypoints       = require('./waypoints.js');
    var locations       = require('./locations.js');
    var users           = require('./users.js');
    var manageRaces     = require('./frontend/races.js');
    var manageWaypoints = require('./frontend/waypoints.js');
    app.use('/', index);
    app.use('/races', races);
    app.use('/waypoints', waypoints);
    app.use('/users', users);
    app.use('/locations', locations);
    app.use('/manageraces', manageRaces);
    app.use('/managewaypoints', manageWaypoints);
};

module.exports = useRoutes;