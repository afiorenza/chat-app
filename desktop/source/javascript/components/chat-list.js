var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var classNames = require('classnames');

// React Bootstrap components
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var ChatList = React.createClass({

    propTypes: {
        messages: React.PropTypes.array
    },

    componentDidUpdate: function () {
    },

    render: function () {
        return (
            <div {...this.getProps()}>
                <ListGroup className="chat-list--list">
                    {this.props.messages.map(this.renderMessage)}
                </ListGroup>
            </div>
        )
    },

    renderMessage: function (message, index) {
        return (
            <ListGroupItem {...this.getMessageProps(message, index)}>
                {message.text}
            </ListGroupItem>
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
            key: index,
            style: {
                'backgroundColor': (message.color) ? message.color : null
            }
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