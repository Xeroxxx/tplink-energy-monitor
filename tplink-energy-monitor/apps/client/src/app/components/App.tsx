import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { Dashboard } from './dashboard/dashboard';
import { DeviceView, DeviceViewFooter, DeviceList } from '@tplink-energy-monitor/devices/feature-devices';
import { useDispatch } from 'react-redux';
import { Header } from './core/header/header';
import { Sidebar } from './core/sidebar/sidebar';
import { initApplication } from '../initApplication';
import { useDevices } from '@tplink-energy-monitor/data-access-devices';
import { Settings } from '@tplink-energy-monitor/user-settings/feature-settings';


export const App: React.FC = () => {
    const dispatch = useDispatch();
    const { currentDevice, loading } = useDevices();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => initApplication(dispatch), []);

    return (
        <div className={`${styles.mainContent} flex-row`}>
            <BrowserRouter>
                <Sidebar />
                <div className={`${styles.contentRight} flex-col`}>
                    <Header />
                    <div>
                        <div className={styles.routerContent}>
                            <Switch>
                                <Route path="/device/:id" component={DeviceView} />
                                <Route path="/settings" component={Settings} />
                                <Route path="/device-list" component={DeviceList} />
                                <Route path="/" component={Dashboard} />
                            </Switch>
                        </div>
                    </div>
                    <div>
                        {!loading && window.location.pathname.includes('device') && (
                            <DeviceViewFooter currentDevice={currentDevice} />
                        )}
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};
