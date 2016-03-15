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
            userName: 'agu' //undefined
        };
    },

    render: function () {
        return (_.isUndefined(this.state.userName)) ?
            <GetNameModal onClose={this.handleModalClose} show={this.showModal()} /> :
            this.renderScreens(); 
    },

    renderScreens: function () {
        return (
            <div className="index">
                <AppBar defaultScreen={this.state.screen} onItemClick={this.handleAppBarItemClick} />
                <div className="index--screen">
                    {this.renderContent()}
                </div>
            </div>
        ); 
    }, 

    renderContent: function () {
        var screens = {
            'board': <CanvasScreen />,
            'chat': <ChatScreen userName={this.state.userName} />
        };

        return screens[this.state.screen];
    },

    showModal: function () {
        return !(this.state.userName);
    },

    handleAppBarItemClick: function (screen) {
        this.setState({
            screen: screen
        });
    },

    handleModalClose: function (userName) {
        ls.set('user', userName);

        this.setState({
            userName: userName
        });
    }
});

ReactDOM.render(<InitialScreen />, document.getElementById('app'));