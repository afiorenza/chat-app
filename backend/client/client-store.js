var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var client = require('./client-model');

var _clients = [];
var colors = [
    '#cfd1d8',
    '#e7e8eb',
    '#C1CDCD',
    '#C0D9D9',
    '#528B8B',
    '#79CDCD',
    '#ADEAEA',
    '#8DEEEE',
    '#97FFFF',
    '#BBFFFF'
];

var clientStore = _.extend({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    addClient: function (connection, message) {
        _clients.push(new client(
            message.user,
            colors.shift(),
            connection
        ));

        clientStore.emitChange();

        return this.getLength() - 1;
    },

    getClients: function () {
        return _clients;
    },

    getConnectedClients: function () {
        var clientNames = [];

        _clients.map(function (client) {
            clientNames.push({
                'name': client.name
            });
        });

        return clientNames;
    },

    getLength: function () {
        return _clients.length;
    },

    removeClient: function (index) {
        colors.unshift(_clients[index].color);

        _clients.splice(index, 1);

        clientStore.emitChange();
    }
});

module.exports = clientStore;