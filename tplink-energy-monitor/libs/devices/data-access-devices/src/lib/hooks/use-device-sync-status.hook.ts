import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '@tplink-energy-monitor/client/store';
import { setSyncActive } from '../redux/device-info/actions/set-sync-status.action';

type DeviceSyncStatus = {
    syncActive: boolean;
    toggleSync: () => void;
};

export const useDeviceSyncStatus = (): DeviceSyncStatus => {
    const syncActive = useSelector((appState: ApplicationState) => appState.deviceInfo.syncActive) || false;
    const dispatch = useDispatch();

    const toggleSync = React.useCallback(() => {
        dispatch(setSyncActive(!syncActive));
    }, [syncActive, dispatch]);

    return { syncActive, toggleSync };
};
