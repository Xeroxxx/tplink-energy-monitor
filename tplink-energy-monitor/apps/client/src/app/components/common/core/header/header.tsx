import * as React from 'react';
import styles from './header.module.scss';
import { SyncStatus } from './sync-status/sync-status';
import { useDeviceSyncStatus } from '@tplink-energy-monitor/data-access-devices';

export const Header: React.FC = () => {
    const { toggleSync, syncActive } = useDeviceSyncStatus();

    return (
        <div className={`${styles.header} flex-end`}>
            {window.location.pathname.includes('device') && (
                <SyncStatus syncActive={syncActive} onSyncClick={toggleSync} />
            )}
        </div>
    );
};
