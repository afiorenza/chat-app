var React = require('react');
var classNames = require('classnames');

// React-Bootstrap components
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

var ChatInput = React.createClass({

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
        return{
            action: '',
            className: this.getClass()
        };
    },

    getInputProps: function () {
        return {
            className: 'chat-input--input',
            placeholder: 'Enter text',
            type: 'text'
        };
    },

    getSendButtonProps: function () {
        return {
            bsStyle: 'primary',
            className: 'chat-input--send-button'
        };
    },

    getClass: function () {
        var classes = {
            'chat-input': true
        };

        classes[this.props.className] = this.props.className;

        return classNames(classes);
    }
});

module.exports = ChatInput;