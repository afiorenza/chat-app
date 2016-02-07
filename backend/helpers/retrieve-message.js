var retrieveMessage = function (color, clients, message) {
    console.log('retrieving message ', message.data, ' from ', message.user);

    var object = {
        time: (new Date()).getTime(),
        text: message.data,
        color: color
    };
    var json = JSON.stringify({
        type: 'message',
        data: object
    });

    for (var index = 0; index < clients.length; index++) {
        clients[index].sendUTF(json);
    }
};

module.exports = retrieveMessage;