import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';
import './ControlPanel.scss';

export default class ControlPanel extends React.Component {

    state = {
        name: ''
    };

    handleChangeName = (name) => this.setState({ name });

    render() {
        const { newName, sendName, isMessageSending, sendNameError } = this.props;
        const { name } = this.state;

        return (
            <div className="control-panel">
                <ControlLabel>{'Hello world, what’s your name'}</ControlLabel>
                <div className="form-group">
                    <FormControl
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        onChange={event => this.handleChangeName(event.target.value)}
                        autoFocus
                    />
                    <Button
                        className="add-button"
                        disabled={!name}
                        bsStyle="primary"
                        onClick={() => sendName(name)}>
                        Answer
                    </Button>
                </div>
                {!!isMessageSending && <Glyphicon className={'spinner'} glyph="refresh" />}
                {!!sendNameError && <div>{`Error: ${sendNameError.message}`}</div>}
                {!!newName && <div>{`Welcome to the system ${newName}`}</div>}
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
