var React = require('react');
var classNames = require('classnames');

// React Bootstrap components
var Nav = require('react-bootstrap').Nav;
var Navbar = require('react-bootstrap').Navbar;
var NavItem = require('react-bootstrap').NavItem;

var AppBar = React.createClass({

    render: function () {
        return (
            <Navbar {...this.getNavBarProps()}>
                <Navbar.Brand>
                    Chat-App
                </Navbar.Brand>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">Board</NavItem>
                    <NavItem eventKey={2} href="#">Chat</NavItem>
                </Nav>
            </Navbar>
        );
    },

    getNavBarProps: function () {
        return {
            fixedTop: true,
            inverse: true
        };
    }
});

module.exports = AppBar;