var React = require('react');
var classNames = require('classnames');

// Component
var ChatInput = require('../components/chat-input');
var ChatList = require('../components/chat-list');
var ChatUsers = require('../components/chat-users');

// Services
var chatService = require('../services/chat-service');
var chatServiceInstance = {};

// Stores
var messageStore = require('../stores/message-store');

var ChatScreen = React.createClass({

    propTypes: {
        userName: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            serviceState: undefined,
            usersConnected: []
        };
    },

    componentDidMount: function () {
        chatServiceInstance = new chatService(this.props.userName);

        chatServiceInstance.onConnect(function (serviceState) {
            this.setState({
                serviceState: serviceState
            });
        }.bind(this));


        var messageReceived =  function (message) {
            messageStore.addMessage(message);
        }.bind(this);

        var userConnection = function (client) {
            this.setState({
                usersConnected: client.clients
            });
        }.bind(this);

        chatServiceInstance.receiveMessage(messageReceived, userConnection);
    },

    render: function () {
        return (
            <div {...this.getProps()}>
                <div className="chat-screen--left-block">
                    {this.renderChatList()}
                    {this.renderChatInput()}
                    {this.renderServerState()}
                </div>
                <div  className="chat-screen--right-block">
                    {this.renderChatUsers()}
                </div>
            </div>
        );
    },

    renderChatList: function () {
        return (
            <ChatList />
        );
    },

    renderChatInput: function () {
        return (
            <ChatInput {...this.getChatInputProps()} />
        );
    },

    renderChatUsers: function () {
        return (
            <ChatUsers users={this.state.usersConnected} />
        );
    },

    renderServerState: function () {
        return (
            <span className={this.getServerStateClass()}>
                {this.getMessageContent()}
            </span>
        );
    },

    getProps: function () {
        return {
            className: 'chat-screen'
        };
    },

    getChatInputProps: function () {
        return {
            className: 'chat-screen--input-block',
            disabled: (this.state.serviceState === 'error'),
            onSendButtonClick: this.handleSendButtonClick,
            username: this.props.userName
        };
    },

    getServerStateClass: function () {
        var classes = {
            'chat-screen--service-state': true,
            'chat-screen--service-state_successful': (this.state.serviceState === 'successful'),
            'chat-screen--service-state_error': (this.state.serviceState === 'error')
        };

        return classNames(classes);
    },

    getMessageContent: function () {
        var messages = {
            'error': 'There has been an error. Please try later.',
            'success': 'Successful connection!'
        };

        return messages[this.state.serviceState];
    },

    handleSendButtonClick: function (message) {
        chatServiceInstance.sendMessage(message);
    }
});

module.exports = ChatScreen;