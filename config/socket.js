module.exports = function(io){
    io.on('connection', function(socket){
        socket.on('raceUpdated', function(data){
            console.log('RACE UPDATED');
            io.sockets.emit('racesUpdated', {});
        });
        socket.on('waypointUpdated', function(data){
            console.log('WAYPOINT UPDATED');
            io.sockets.emit('waypointsUpdated', {});
        })
    });
}