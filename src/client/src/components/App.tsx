import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { Dashboard } from './modules/dashboard/dashboard';
import { DeviceView } from './modules/devices/device-view/device-view';
import configureStore, { initialAppState } from '../redux/store';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Header } from './common/core/header/header';
import { Sidebar } from './common/core/sidebar/sidebar';

const history = createBrowserHistory();
const store = configureStore(history, initialAppState);

export const App: React.FC = () => (
    <div className={`${styles.app} flex-col`}>
        <Provider store={store}>
            <div className={`${styles.mainContent} flex-row`}>
                <BrowserRouter>
                    <Sidebar />
                    <div className={styles.contentRight}>
                        <Header />
                        <div className={styles.routerContent}>
                            <Switch>
                                <Route path="/device/:id" component={DeviceView} />
                                <Route path="/" component={Dashboard} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        </Provider>
    </div>
);
