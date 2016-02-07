var http = require('http');
var WebSocketServer = require('websocket').server;

// Helpers
var retrieveMessage = require('./helpers/retrieve-message');
var userConnection = require('./helpers/user-connection');
var userDisconnection = require('./helpers/user-disconnection');

var clients = [];
var colors = ['#cfd1d8', '#e7e8eb'];

var server = http.createServer(function(request, response) {});
server.listen(3000, function() { });

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        var parsedMessage = JSON.parse(message.utf8Data);

        switch (parsedMessage.type) {
            case 'message-retrieve':
                retrieveMessage(colors, clients, parsedMessage);
                break;

            case 'user-connected':
                userConnection(colors, clients, connection, parsedMessage);
                break;

            case 'user-disconnected':
                userDisconnection(clients, parsedMessage);

            default:
                return null;
                break;
        }
    });

    connection.on('close', function() {
    });
});
