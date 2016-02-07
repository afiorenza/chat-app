var http = require('http');
var WebSocketServer = require('websocket').server;

var clients = [];
var colors = ['#cfd1d8', '#e7e8eb'];

var server = http.createServer(function(request, response) {});
server.listen(3000, function() { });

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    console.log(request.origin);
    var connection = request.accept(null, request.origin);
    var color = colors.shift();
    var index = clients.push(connection) - 1;

    connection.on('message', function(message) {
        var object = {
            time: (new Date()).getTime(),
            text: message.utf8Data,
            color: color
        };
        var json = JSON.stringify({
            type: 'message',
            data: object
        });

        for (var index = 0; index < clients.length; index++) {
            clients[index].sendUTF(json);
        }
    });

    connection.on('close', function() {
        clients.splice(index, 1);
    });
});
