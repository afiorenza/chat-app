var React = require('react');
var ReactDOM = require('react-dom');

// Pages
var ChatScreen = require('./pages/chat-screen');

// Components
var GetNameModal = require('./components/get-name-modal');

var InitialScreen = React.createClass({

    getInitialState: function () {
        return {
            userName: 'adolfo hitler'
        };
    },

    render: function () {
        return (this.state.userName) ?
            <ChatScreen userName={this.state.userName} /> :
            <GetNameModal onClose={this.handleModalClose} show={this.showModal()} />;
    },

    showModal: function () {
        return !(this.state.userName);
    },

    handleModalClose: function (userName) {
        this.setState({
            userName: userName
        });
    }
});

ReactDOM.render(<InitialScreen />, document.getElementById('app'));