import * as React from 'react';
import styles from './header.module.scss';
import { SyncStatus } from './sync-status/sync-status';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../redux/store';
import { setSyncActive } from '../../../../redux/device-info/actions/set-sync-status.action';

export const Header: React.FC = () => {
    const syncActive = useSelector((appState: ApplicationState) => appState.deviceInfo.syncActive);
    const dispatch = useDispatch();

    const onSyncClick = () => {
        dispatch(setSyncActive(!syncActive));
    };

    return (
        <div className={`${styles.header} flex-end`}>
            <SyncStatus syncActive={syncActive} onSyncClick={onSyncClick} />
        </div>
    );
};
