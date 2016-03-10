var React = require('react');
var ReactDOM = require('react-dom');
var ls = require('local-storage');
var _ = require('lodash');

// Pages
var CanvasScreen = require('./pages/canvas-screen');
var ChatScreen = require('./pages/chat-screen');

// Components
var AppBar = require('./components/app-bar');
var GetNameModal = require('./components/get-name-modal');

var InitialScreen = React.createClass({

    getInitialState: function () {
        return {
            screen: 'chat',
            userName: undefined
        };
    },

    render: function () {
        return (_.isUndefined(this.state.userName)) ?
            <GetNameModal onClose={this.handleModalClose} show={this.showModal()} /> :
            this.renderScreens(); 
    },

    renderScreens: function () {
        return (
            <div>
                <AppBar />
                <div>
                    {this.renderContent()}
                </div>
            </div>
        ); 
    }, 

    renderContent: function () {
        var node = null;
        var screens: {
            'board': <CanvasScreen />,
            'chat': <ChatScreen userName={this.state.userName} />
        };

        return this.state.screens[screen];
    },

    showModal: function () {
        return !(this.state.userName);
    },

    handleModalClose: function (userName) {
        ls.set('user', userName);

        this.setState({
            userName: userName
        });
    }
});

ReactDOM.render(<InitialScreen />, document.getElementById('app'));