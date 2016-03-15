var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');

// React Bootstrap components
var Glyphicon = require('react-bootstrap').Glyphicon;
var Nav = require('react-bootstrap').Nav;
var Navbar = require('react-bootstrap').Navbar;
var NavItem = require('react-bootstrap').NavItem;

var AppBar = React.createClass({

    propTypes: {
        onItemClick: React.PropTypes.func,
        defaultScreen: React.PropTypes.string
    },

    getInitialState: function () {
        return {
            activeScreen: this.props.defaultScreen
        };
    },

    render: function () {
        return (
            <Navbar {...this.getNavBarProps()}>
                <Navbar.Brand style={this.getBrandStyle()}>
                    <Glyphicon style={this.getIconStyle()} glyph="menu-right" />
                    Chat-App
                </Navbar.Brand>
                <Nav pullRight>
                    {this.renderNavItems()}
                </Nav>
            </Navbar>
        );
    },

    renderNavItems: function () {
        var items = ['board', 'chat'];

        return items.map(function (item, index) {
            return this.getItem(item, index);
        }.bind(this));
    },

    getNavBarProps: function () {
        return {
            className: 'app-bar',
            fixedTop: true,
            inverse: true
        };
    },

    getItem: function (item, index) {
        var props = {
            active: this.isActive(item),
            key: index,
            onClick: this.handleItemClick.bind(this, item)
        };

        return <NavItem {...props}>{_.capitalize(item)}</NavItem>;
    },

    getBrandStyle: function () {
        return {
            color: '#00d8ff'
        }
    },

    getIconStyle: function () {
        return {
            paddingRight: 10
        }
    },

    handleItemClick: function (screen) {
        this.setState({
            activeScreen: screen
        });

        if (this.props.onItemClick) {
            this.props.onItemClick(screen);
        }
    },

    isActive: function (screen) {
        return (this.state.activeScreen === screen);
    }
});

module.exports = AppBar;
