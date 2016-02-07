var http = require('http');
var WebSocketServer = require('websocket').server;

// Helpers Todo: manage how make this work with references.
//var retrieveMessage = require('./helpers/retrieve-message');
//var userConnection = require('./helpers/user-connection');
//var userDisconnection = require('./helpers/user-disconnection');

// Classes
var userClass = require('./classes/user');

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
                retrieveMessage(parsedMessage);
                break;

            case 'user-connected':
                userConnection(connection, parsedMessage);
                break;

            case 'user-disconnected':
                userDisconnection(clients, parsedMessage);
                break;

            default:
                return null;
                break;
        }
    });

    connection.on('close', function() {
    });
});

function retrieveMessage (message) {

    for (var index = 0; index < clients.length; index++) {

        clients[index].connection.sendUTF(
            JSON.stringify({
                type: 'message',
                data: {
                    time: (new Date()).getTime(),
                    text: message.data,
                    color: clients[index].color
                }
            })
        );
    }
}

function userConnection (connection, message) {
    var color = colors.shift();
    var connectedUsers = getConnectedUsers();
    var user = new userClass(message.user, color, connection);

    clients.push(user);

    connection.sendUTF(
        JSON.stringify({
            type: 'connected-users',
            data: {
                total: connectedUsers.length,
                users: connectedUsers
            }
        })
    );
}

function userDisconnection () {}

function getConnectedUsers () {
    var userNames = [];

    clients.map(function (client) {
        userNames.push(client.name);
    });

    return userNames;
}


