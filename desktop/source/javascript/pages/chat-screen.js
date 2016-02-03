var React = require('react');

var ChatScreen = React.createClass({

    render: function () {
        return (
            <div {...this.getProps()}>
                <h1>chat screen</h1>
                <h3>aaaaaa</h3>
            </div>
        );
    },

    getProps: function () {
        return {
            className: 'chat-screen'
        };
    }
});

module.exports = ChatScreen;