var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
    console.log('user connected');

    socket.on('message', function (message) {
        io.emit('message', message);
    });

    socket.on('disconnect', function () {
       console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('Listening on *:3000');
});

