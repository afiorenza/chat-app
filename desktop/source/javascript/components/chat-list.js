var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var classNames = require('classnames');
var ls = require('local-storage');

// React Bootstrap components
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

// Store
var messageStore = require('../stores/message-store');

var ChatList = React.createClass({

    getInitialState: function () {
        return {
            messages: []
        };
    },

    componentDidMount: function () {
        messageStore.addChangeListener(this.handleReceiveMessage);
    },

    componentDidUpdate: function() {
        var node = ReactDOM.findDOMNode(this).childNodes[0];

        if (node.clientHeight < node.scrollHeight ) {
            node.scrollTop = node.scrollHeight;
        }
    },

    componentWillUnmount: function () {
        messageStore.removeChangeListener(this.handleReceiveMessage);
    },

    handleReceiveMessage: function () {
        this.setState({
            messages: messageStore.getMessages()
        });
    },

    render: function () {
        return (
            <div {...this.getProps()}>
                <ListGroup className="chat-list--list">
                    {this.state.messages.map(this.renderMessage)}
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
                'backgroundColor': (message.color) ? message.color : null,
                'textAlign': this.isMessageFromLocalUser(message) ? 'right' : null
            }
        };
    },

    getClass: function () {
        var classes = {
            'chat-list': true
        };

        classes[this.props.className] = this.props.className;

        return classNames(classes);
    },

    isMessageFromLocalUser: function (message) {
        return (ls.get('user') === message.client);
    }
});

module.exports = ChatList;