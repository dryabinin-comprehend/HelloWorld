import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './app/App';
import ControlPanelContainer from './controlPanel/containers/ControlPanelContainer';

export default () => (
    <Route path="/" component={App}>
        <IndexRedirect to="hello" />
        <Route path="hello" component={ControlPanelContainer} />
    </Route>
);
