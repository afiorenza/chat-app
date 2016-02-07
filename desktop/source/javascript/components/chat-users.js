var React = require('react');
var ReactBootstrap = require('react-bootstrap');

// React Bootstrap components
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;


var ChatUsers = React.createClass({

    getDefaultProps: function () {
        return {
            users: []
        };
    },

    render: function () {
        return (
            <ListGroup>
                {this.props.users.map(this.renderUser)}
            </ListGroup>
        );
    },

    renderUser: function (user, index) {
        return (
            <ListGroupItem key={index}>{user.name}</ListGroupItem>
        );
    }
});

module.exports = ChatUsers;