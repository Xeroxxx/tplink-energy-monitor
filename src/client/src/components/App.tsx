import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Dashboard } from './modules/dashboard/dashboard';
import { DeviceView } from './modules/devices/device-view/device-view';
import configureStore, { initialAppState } from '../redux/store';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

const history = createBrowserHistory();
const store = configureStore(history, initialAppState);

export const App: React.FC = () => (
    <div className="App">
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/device/:id" component={DeviceView} />
                    <Route path="/" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </Provider>
    </div>
);
