import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { Dashboard } from './modules/dashboard/dashboard';
import { DeviceView } from './modules/devices/device-view/device-view';
import { useDispatch } from 'react-redux';
import { Header } from './common/core/header/header';
import { Sidebar } from './common/core/sidebar/sidebar';
import { DeviceViewFooter } from './modules/devices/device-view/components/footer/device-view-footer';
import { initApplication } from '../initApplication';
import { useDevices } from '../custom-hooks/device-view/use-devices.hook';

export const App: React.FC = () => {
    const dispatch = useDispatch();
    const { currentDevice, loading } = useDevices();

    const init = React.useCallback(() => {
        initApplication(dispatch);
    }, []);

    React.useEffect(() => init(), []);

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
                                <Route path="/" component={Dashboard} />
                            </Switch>
                        </div>
                    </div>
                    <div>
                        {!loading &&
                        window.location.pathname.includes('device') &&
                            <DeviceViewFooter currentDevice={currentDevice} />
                        }
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};
