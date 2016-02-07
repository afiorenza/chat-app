var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var _ = require('lodash');

// React Bootstrap Components
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var Modal = ReactBootstrap.Modal;

var GetNameModal = React.createClass({

    propTypes: {
        onClose: React.PropTypes.func,
        show: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return{show: true};
    },

    render: function () {
        return (
            <Modal show={this.props.show}>
                <Modal.Body>
                    <Input {...this.getInputProps()} />
                    <Button {...this.getButtonProps()}>Go to chat!</Button>
                </Modal.Body>
            </Modal>
        );
    },

    getInputProps: function () {
        return {
            placeholder: 'Write here your user name...',
            ref: 'nameInput',
            type: 'text'
        };
    },

    getButtonProps: function () {
        return {
            bsStyle: 'primary',
            onClick: this.handleSubmitButtonClick  
        };
    },

    handleSubmitButtonClick: function () {
        var userName = this.refs.nameInput.getValue();

        if (!_.isEmpty(userName) && this.props.onClose) {
            this.props.onClose(userName);
        }
    }
});

module.exports = GetNameModal;