import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/components/app';
import configureStore, { initialAppState } from './app/redux/store';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import reportWebVitals from './app/reportWebVitals';

const history = createBrowserHistory();
const store = configureStore(history, initialAppState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
