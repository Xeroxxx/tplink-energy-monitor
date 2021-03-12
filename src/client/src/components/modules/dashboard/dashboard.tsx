import * as React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../redux/store';
import { Card } from '../../common/layout/card/card';
import styles from './dashboard.module.scss';

export const Dashboard: React.FC = () => {
    const deviceState = useSelector((appState: ApplicationState) => appState.devices);
    const [deviceCount, setDeviceCount] = React.useState<number>(0);

    React.useEffect(() => {
        if (deviceState.status === 'OK') {
            setDeviceCount(deviceState.devices?.length || 0);
        }
    }, [deviceState]);

    return (
        <div className={styles.dashboard}>
            <div className="flex-center">
                <h2>Dashboard</h2>
            </div>
            <div className={styles.infoBar}>
                <Card type="power-card" className={styles.deviceCount}>
                    <div className={`${styles.deviceCountContent} flex-col`}>
                        <h1 className="flex-center">{deviceCount}</h1>
                        <small>Device count</small>
                    </div>
                </Card>
            </div>
        </div>
    );
};
