import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { controlPanelReducer } from '../controlPanel/reducers/ControlPanelReducer';

export default combineReducers({
    routing,
    controlPanelReducer
});
