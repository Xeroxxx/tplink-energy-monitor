import * as React from 'react';
import { Card } from '@tplink-energy-monitor/ui-shared';
import styles from './dashboard.module.scss';
import { useDevices } from '../../../custom-hooks/device-view/use-devices.hook';

export const Dashboard: React.FC = () => {
    const { deviceCount } = useDevices();

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
