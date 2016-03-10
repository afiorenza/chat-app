var constants = require('./constants');

window.WebSocket = window.WebSocket || window.MozWebSocket;

var chatService = function (user) {
    this.user = user;
};

chatService.prototype.setConnection = function (connection) {
    this.connection = connection;
};

chatService.prototype.getConnection = function () {
    return this.connection;
};

chatService.prototype.onConnect = function (callback) {
    //TODO: See another way to do this
    var IP = 'ws://192.168.0.13:3000';

    this.setConnection(new WebSocket(IP));

    this.getConnection().onopen = function () {
        this.getConnection().send(
            JSON.stringify({
                'type': constants.USER_CONNECTED,
                'user': this.user
            })
        );

        if (callback) {
            callback('success');
        }
    }.bind(this);

    this.getConnection().onerror = function () {
        if (callback) {
            callback('error');
        }
    };
};

chatService.prototype.receiveMessage = function (messageReceived, userConnection) {
    this.getConnection().onmessage = function (message) {
        var parsedMessage;

        if (message.data) {
            parsedMessage = JSON.parse(message.data);
        }

        switch (parsedMessage.type) {
            case constants.MESSAGE_RETRIEVE:
                if(messageReceived && parsedMessage) {
                    messageReceived(parsedMessage.data);
                }
                break;

            case constants.USER_CONNECTIONS:
                if(userConnection && parsedMessage) {
                    userConnection(parsedMessage.data);
                }
                break;

            default:
                break;
        }
    }.bind(this);
};

chatService.prototype.sendMessage = function (message) {
    this.getConnection().send(
        JSON.stringify({
            'data': message,
            'type': constants.MESSAGE_RETRIEVE,
            'user': this.user
        })
    );
};

module.exports = chatService;
