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
            <div>
                <Modal show={this.props.show}>
                    <Modal.Dialog>
                        <Modal.Body>
                            <Input {...this.getInputProps()} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button {...this.getButtonProps()}>Start chatting!</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>
        );
    },

    getInputProps: function () {
        return {
            hint: 'Write here your user name...',
            ref: 'nameInput',
            type: 'text'
        };
    },

    getButtonProps: function () {
        return {
            onClick: this.handleSubmitButtonClick  
        };
    },

    handleSubmitButtonClick: function () {
        var userName = this.refs.nameInput.getValue();

        if (!_.isEmpty(userName) && this.props.onHide) {
            this.props.onHide(userName);
        }
    }
});

module.exports = GetNameModal;