var http = require('http');
var WebSocketServer = require('websocket').server;
var constants = require('./constants');

// Store
var clientStore = require('./client/client-store');

// Helpers Todo: manage how make this work with references.
//var retrieveMessage = require('./helpers/retrieve-message');
//var clientConnection = require('./helpers/client-connection');
//var clientDisconnection = require('./helpers/client-disconnection');

var server = http.createServer(function(request, response) {});
server.listen(3000, function() {console.log('up and running!');});

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    var clientIndex;

    connection.on('message', function(message) {
        var parsedMessage = JSON.parse(message.utf8Data);

        switch (parsedMessage.type) {
            case constants.MESSAGE_RETRIEVE:
                retrieveMessage(parsedMessage, clientIndex);
                break;

            case constants.USER_CONNECTED:
                clientIndex = clientStore.addClient(connection, parsedMessage);
                break;

            default:
                return null;
                break;
        }
    });

    connection.on('close', function() {
        clientStore.removeClient(clientIndex);
    });
});

clientStore.addChangeListener(function () {
    clientStore.getClients().map(function (client) {
        client.connection.sendUTF(
            JSON.stringify({
                type: constants.USER_CONNECTIONS,
                data: {
                    total: clientStore.getLength(),
                    clients: clientStore.getConnectedClients()
                }
            })
        );
    });
});

function retrieveMessage (message, clientIndex) {
    var clients = clientStore.getClients();

    clientStore.getClients().map(function (client) {
        client.connection.sendUTF(
            JSON.stringify({
                type: constants.MESSAGE_RETRIEVE,
                data: {
                    color: [clientIndex].color,
                    text: message.data,
                    time: (new Date()).getTime(),
                    client: clients[clientIndex].name
                }
            })
        );
    });
}
