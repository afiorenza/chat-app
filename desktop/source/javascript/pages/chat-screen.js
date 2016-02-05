var React = require('react');

// React-Bootstrap components
var Navbar = require('react-bootstrap').Navbar;

// Component
var ChatInput = require('../components/chat-input');
var ChatList = require('../components/chat-list');

var data = [
    {content: 'aaaaaaaaaaaaaaaaaaa'},
    {content: 'bbbbbbbbbbbbbbbbbbb'},
    {content: 'ccccccccccccccccccc'},
    {content: 'ddddddddddddddddddd'}
];

var ChatScreen = React.createClass({

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
            <ChatList messages={data} />
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