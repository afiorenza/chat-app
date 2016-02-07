window.WebSocket = window.WebSocket || window.MozWebSocket;
var connection;

var chatService = {

    onConnect: function (callback) {
        connection = new WebSocket('ws://192.168.0.32:3000');

        connection.onopen = function () {
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

    receiveMessage: function (callback) {
        connection.onmessage = function (message) {
            if(callback && message) {
                callback(message);
            }
        }.bind(this);
    },

    sendMessage: function (message) {
        connection.send(message);
    }
};

module.exports = chatService;