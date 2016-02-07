var http = require('http');
var WebSocketServer = require('websocket').server;
var constants = require('./constants');

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
    var index;

    connection.on('message', function(message) {
        var parsedMessage = JSON.parse(message.utf8Data);

        switch (parsedMessage.type) {
            case constants.MESSAGE_RETRIEVE:
                retrieveMessage(parsedMessage);
                break;

            case constants.USER_CONNECTED:
                index = userConnection(connection, parsedMessage);
                break;

            default:
                return null;
                break;
        }
    });

    connection.on('close', function() {
        clients.splice(index - 1, 1);

        sendConnectedUsers();
    });
});

function retrieveMessage (message) {

    clients.map(function (client, index) {

        client.connection.sendUTF(
            JSON.stringify({
                type: constants.MESSAGE_RETRIEVE,
                data: {
                    time: (new Date()).getTime(),
                    text: message.data,
                    color: clients[index].color
                }
            })
        );
    });
}

function userConnection (connection, message) {
    var color = colors.shift();
    var user = new userClass(message.user, color, connection);

    clients.push(user);
    sendConnectedUsers();

    return clients.length;
}

function sendConnectedUsers () {
    var connectedUsers = getConnectedUsers();

    clients.map(function (client) {
        client.connection.sendUTF(
            JSON.stringify({
                type: constants.USER_CONNECTIONS,
                data: {
                    total: connectedUsers.length,
                    users: connectedUsers
                }
            })
        );
    });
}

function getConnectedUsers () {
    var userNames = [];

    clients.map(function (client) {
        userNames.push({
            'name': client.name
        });
    });

    return userNames;
}