import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import rootReducer from './rootReducer';

const logger = createLogger({
    level: 'log',
    collapsed: true
});

export default (initialState) => createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger)
);
