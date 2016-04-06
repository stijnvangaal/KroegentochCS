module.exports = function(io){
    io.on('connection', function(socket){
        socket.on('testEvent', function(data){
            console.log(data);
        })
    });
}