import { SEND_NAME_REQUEST, SEND_NAME_SUCCESS, SEND_NAME_ERROR } from '../constants/ControlPanelConstants';

const initialState = {
    newName: '',
    isMessageSending: false,
    sendNameError: null
};

export const controlPanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_NAME_REQUEST:
            return {
                ...state,
                isMessageSending: true
            }
        case SEND_NAME_SUCCESS:
            return {
                ...state,
                isMessageSending: false,
                newName: action.payload
            }
        case SEND_NAME_ERROR:
            return {
                ...state,
                isMessageSending: false,
                sendNameError: action.error
            }
        default:
            return state;
    }
}
