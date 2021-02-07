import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { Dashboard } from './modules/dashboard/dashboard';
import { DeviceView } from './modules/devices/device-view/device-view';
import { ApplicationState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Header } from './common/core/header/header';
import { Sidebar } from './common/core/sidebar/sidebar';
import { DeviceViewFooter } from './modules/devices/device-view/components/footer/device-view-footer';

export const App: React.FC = () => {
    const deviceState = useSelector((appState: ApplicationState) => appState.deviceInfo);
    const devicesState = useSelector((appState: ApplicationState) => appState.devices);

    const currentDevice = React.useMemo(() => {
        return devicesState.devices.find((device) => device.id === deviceState.device?.id);
    }, [deviceState]);

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
                        {devicesState.status !== 'PENDING' &&
                        deviceState.status !== 'PENDING' &&
                        window.location.pathname.includes('device') &&
                            <DeviceViewFooter currentDevice={currentDevice} />
                        }
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};
