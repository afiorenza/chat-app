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
    this.setConnection(new WebSocket('ws://192.168.0.32:3000'));

    this.getConnection().onopen = function () {
        this.getConnection().send(
            JSON.stringify({
                'type': 'user-connected',
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

chatService.prototype.onDisconnect = function () {
    this.getConnection().send(
        JSON.stringify({
            'type': 'user-disconnected',
            'user': this.user
        })
    );
};

chatService.prototype.receiveMessage = function (callback) {
    this.getConnection().onmessage = function (message) {
        var parsedMessage = JSON.parse(message.data);

        switch (parsedMessage.type) {
            case 'message':
                break;

            case 'connected-users':
                break;

            default:
                break;
        }

        if(callback && message) {
            callback(message);
        }
    }.bind(this);
};

chatService.prototype.sendMessage = function (message) {
    this.getConnection().send(
        JSON.stringify({
            'data': message,
            'type': 'message-retrieve',
            'user': this.user
        })
    );
};

module.exports = chatService;
