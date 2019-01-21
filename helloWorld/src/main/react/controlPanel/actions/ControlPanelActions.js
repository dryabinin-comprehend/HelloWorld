import { SEND_NAME_REQUEST, SEND_NAME_SUCCESS, SEND_NAME_ERROR } from '../constants/ControlPanelConstants';
import { STATUS_OK } from '../../common/commonConstants';
import { getDomainDefault } from '../../common/commonUtils';
import fetch from 'isomorphic-fetch';

export const sendName = (name) => dispatch => {
    dispatch({ type: SEND_NAME_REQUEST });

    const url = getDomainDefault() + '/hello';
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    };

    fetch(url, requestOptions)
        .then(response => {
            if (response.status === STATUS_OK) {
                response.text()
                    .then(result => {
                        dispatch({ type: SEND_NAME_SUCCESS, payload: result });
                    })
                    .catch((error) => dispatch({
                        type: SEND_NAME_ERROR,
                        error: {
                            status: response.status,
                            message: error.statusText
                        }
                    }));
            } else {
                throw Error(response.statusText);
            }
        })
        .catch((error) => {
            dispatch({ type: SEND_NAME_ERROR, error: { message: error.message } });
        });
};
