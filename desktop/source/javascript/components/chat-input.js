var React = require('react');
var classNames = require('classnames');
var keyCode = require('keycode');
var _ = require('lodash');

// React-Bootstrap components
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

var ChatInput = React.createClass({

    propTypes: {
        disabled: React.PropTypes.bool,
        onSendButtonClick: React.PropTypes.func,
        username: React.PropTypes.string
    },

    getInitialState: function () {
        return {
            inputValue: ''
        };
    },

    render: function () {
        return (
            <div {...this.getProps()}>
                <div className="chat-input--input-wrapper">
                    <Input {...this.getInputProps()} />
                </div>
                <Button {...this.getSendButtonProps()}>Send!</Button>
            </div>
        );
    },

    getProps: function () {
        return {
            className: this.getClass()
        };
    },

    getInputProps: function () {
        return {
            className: 'chat-input--input',
            disabled: this.props.disabled,
            onChange: this.handleInputChange,
            onKeyDown: this.handleInputKeyDown,
            placeholder: this.props.username + ' enter text...',
            ref: 'messageInput',
            value: this.state.inputValue,
            type: 'text'
        };
    },

    getSendButtonProps: function () {
        return {
            bsStyle: 'primary',
            className: 'chat-input--send-button',
            disabled: this.props.disabled,
            onClick: this.handleSendButtonClick
        };
    },

    getClass: function () {
        var classes = {
            'chat-input': true
        };

        classes[this.props.className] = this.props.className;

        return classNames(classes);
    },

    handleSendButtonClick: function () {
        var inputValue = this.refs.messageInput.getValue().trim();

        if (this.props.onSendButtonClick && !_.isEmpty(inputValue)) {
            this.props.onSendButtonClick(inputValue);
        }

        this.clearInputValue();
    },

    handleInputChange: function (event) {
        this.setState({inputValue: event.target.value});
    },

    handleInputKeyDown: function (event) {
        if (event.keyCode === keyCode.code.enter) {
            this.handleSendButtonClick();
        }
    },

    clearInputValue: function () {
        this.setState({inputValue: ''});
    }
});

module.exports = ChatInput;