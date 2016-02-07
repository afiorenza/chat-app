var http = require('http');
var WebSocketServer = require('websocket').server;
var _ = require('lodash');

var clients = [];

var server = http.createServer(function(request, response) {});
server.listen(3000, function() { });

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            _.mapValues(clients, function (client) {
                client.sendUTF(message.utf8Data)
            });
        }
    });

    connection.on('close', function() {
        clients.splice(index, 1);
    });
});
