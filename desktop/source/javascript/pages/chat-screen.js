var React = require('react');
var classNames = require('classnames');

// React-Bootstrap components
var Navbar = require('react-bootstrap').Navbar;

// Component
var ChatInput = require('../components/chat-input');
var ChatList = require('../components/chat-list');
var ChatUsers = require('../components/chat-users');

// Services
var chatService = require('../services/chat-service');

var ChatScreen = React.createClass({

    getInitialState: function () {
        return {
            messages: [],
            serviceState: 'Error connecting with the service'
        };
    },

    componentDidMount: function () {
        chatService.onConnect(function (serviceState) {
            this.setState({
                serviceState: serviceState
            });
        }.bind(this));


        chatService.receiveMessage(function (message) {
            var newMessages = this.state.messages;

            newMessages.push(message);

            this.setState({
               messages: newMessages
            });
        }.bind(this));
    },

    render: function () {
        return (
            <div {...this.getProps()}>
                <div className="chat-screen--left-block">
                    {this.renderNavBar()}
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

    renderNavBar: function () {
        return (
            <Navbar {...this.getNavBarProps()}>
                <Navbar.Brand>
                    Chat-App
                </Navbar.Brand>
            </Navbar>
        );
    },

    renderChatList: function () {
        return (
            <ChatList messages={this.state.messages} />
        );
    },

    renderChatInput: function () {
        return (
            <ChatInput {...this.getChatInputProps()} />
        );
    },

    renderChatUsers: function () {
        var users = [
            {'name': 'mock 1'},
            {'name': 'mock 2'},
            {'name': 'mock 3'},
            {'name': 'mock 4'}
        ];
        return (
            <ChatUsers users={users} />
        );
    },

    getChatInputProps: function () {
        return {
            className: 'chat-screen--input-block',
            disabled: (this.state.serviceState === 'error'),
            onSendButtonClick: this.sendMessage
        };
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

    getNavBarProps: function () {
        return {
            fixedTop: true,
            inverse: true
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

    sendMessage: function (message) {
        chatService.sendMessage(message);
    }
});

module.exports = ChatScreen;