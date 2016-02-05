var React = require('react');

// React-Bootstrap components
var Navbar = require('react-bootstrap').Navbar;

// Component
var ChatInput = require('../components/chat-input');
var ChatList = require('../components/chat-list');

// Services
var chatService = require('../services/chat-service');

console.log(chatService);

var ChatScreen = React.createClass({

    getInitialState: function () {
        return {
            messages: []
        };
    },

    render: function () {
        return (
            <div {...this.getProps()}>
                {this.renderNavBar()}
                {this.renderChatList()}
                {this.renderChatInput()}
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
            <ChatInput className="chat-screen--input-block" />
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
    }
});

module.exports = ChatScreen;