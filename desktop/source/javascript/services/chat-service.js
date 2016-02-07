window.WebSocket = window.WebSocket || window.MozWebSocket;
var connection;

var chatService = {

    initialize: function (user) {
        this.user = user;
    },

    onConnect: function (callback) {
        connection = new WebSocket('ws://192.168.0.32:3000');

        connection.onopen = function () {
            connection.send(
                JSON.stringify({
                    'type': 'user-connected',
                    'user': this.user
                })
            );

            if (callback) {
                callback('success');
            }
        }.bind(this);

        connection.onerror = function () {
            if (callback) {
                callback('error');
            }
        };
    },

    onDisconnect: function () {
        connection.send(
            JSON.stringify({
            'type': 'user-disconnected',
            'user': this.user
            })
        );
    },

    receiveMessage: function (callback) {
        connection.onmessage = function (message) {
            if(callback && message) {
                callback(message);
            }
        }.bind(this);
    },

    sendMessage: function (message) {
        connection.send(
            JSON.stringify({
                'data': message,
                'type': 'message-retrieve',
                'user': this.user
            })
        );
    }
};

module.exports = chatService;