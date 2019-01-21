import React from 'react';
import PropTypes from 'prop-types';
import { Form, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';
import './ControlPanel.scss';

export default class ControlPanel extends React.Component {

    state = {
        name: ''
    };

    handleChangeName = (name) => this.setState({ name });

    handleSendName = (event) => {
        const { sendName } = this.props;
        const { name } = this.state;

        event.preventDefault();

        sendName(name)
    };

    //this is unsafe method
    newNameComponent = (newName) => <div id="greeting-name" dangerouslySetInnerHTML={{ __html: newName }}></div>

    render() {
        const { newName, isMessageSending, sendNameError, sendName } = this.props;
        const { name } = this.state;

        return (
            <div className="control-panel">
                <ControlLabel>{'Hello world, what’s your name'}</ControlLabel>
                <Form className="form-group" onSubmit={this.handleSendName}>
                    <FormControl
                        id="name-input"
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        onChange={event => this.handleChangeName(event.target.value)}
                        autoFocus
                    />
                    <Button
                        id="add-button"
                        className="add-button"
                        disabled={!name || isMessageSending}
                        bsStyle="primary"
                        onClick={() => sendName(name)}>
                        Answer
                    </Button>
                </Form>
                {isMessageSending && <Glyphicon className={'spinner'} glyph="refresh" />}
                {!!sendNameError && <div>{`Error: ${sendNameError.message}`}</div>}
                {!isMessageSending && !!newName && this.newNameComponent(newName)}
            </div>
        )
    }
}

ControlPanel.propTypes = {
    newName: PropTypes.string,
    isMessageSending: PropTypes.bool,
    sendNameError: PropTypes.object,
    sendName: PropTypes.func
};
