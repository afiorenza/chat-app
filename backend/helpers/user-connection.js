var userConnection = function (colors, clients, connection, message) {
    console.log('connecting ', message.user);

    var color = colors.shift();
    var index = clients.push(connection) - 1;
};

module.exports = userConnection;