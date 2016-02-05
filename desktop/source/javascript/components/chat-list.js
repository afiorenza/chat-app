var React = require('react');
var classNames = require('classnames');

var ChatList = React.createClass({

    propTypes: {
        messages: React.PropTypes.array
    },

    render: function () {
        return (
            <div {...this.getProps()}>
                <ul className="chat-list--list">
                    {this.props.messages.map(this.renderMessage)}
                </ul>
            </div>
        )
    },

    renderMessage: function (message, index) {
        return (
            <li {...this.getMessageProps(message, index)}>
                {message.content}
            </li>
        );
    },

    getProps: function () {
        return {
            className: this.getClass()
        };
    },

    getMessageProps: function (message, index) {
        return {
            className: 'chat-list--message',
            key: index
        };
    },

    getClass: function () {
        var classes = {
            'chat-list': true
        };

        classes[this.props.className] = this.props.className;

        return classNames(classes);
    }
});

module.exports = ChatList;