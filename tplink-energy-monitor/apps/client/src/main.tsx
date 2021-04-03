import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/components/App';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { configureStore, initialAppState } from "@tplink-energy-monitor/client/store";

const history = createBrowserHistory();
const store = configureStore(history, initialAppState);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
