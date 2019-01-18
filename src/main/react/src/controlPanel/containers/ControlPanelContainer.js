import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ControlPanel from '../components/ControlPanel';
import { sendName } from '../actions/ControlPanelActions';

class ControlPanelContainer extends React.Component {

    render() {
        const { newName, isMessageSending, sendName, sendNameError } = this.props;

        return (
            <ControlPanel
                sendName={sendName}
                newName={newName}
                isMessageSending={isMessageSending}
                sendNameError={sendNameError}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        newName: state.controlPanelReducer.newName,
        isMessageSending: state.controlPanelReducer.isMessageSending,
        sendNameError: state.controlPanelReducer.sendNameError
    }
}

const mapDispatchToPropos = () => dispatch => bindActionCreators({
    sendName
}, dispatch);

export default connect(mapStateToProps, mapDispatchToPropos)(ControlPanelContainer);
