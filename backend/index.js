var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (request, response) {
    response.send('<h1>Hello socket io</h1>');
});

io.on('connection', function (socket) {
    console.log('user connected');
});

http.listen(3000, function () {
    console.log('Listening on *:3000');
});
