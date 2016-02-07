var userDisconnection = function (clients, message) {
    console.log('disconnecting ', message.user);

    clients.splice(index, 1);
};

module.exports = userDisconnection;