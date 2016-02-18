var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var _messages = [];

var messageStore = _.extend({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    addMessage: function (message) {
        _messages.push(message);

        messageStore.emitChange(message);
    },

    getMessages: function () {
        return _messages;
    }
});

module.exports = messageStore;