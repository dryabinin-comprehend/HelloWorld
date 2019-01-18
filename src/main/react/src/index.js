import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './redux/store';

const store = configureStore();
const routerHistory = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={routerHistory} routes={routes()} />
    </Provider>,
    document.getElementById('root')
);
