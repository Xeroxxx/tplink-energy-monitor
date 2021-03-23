import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../redux/store';
import { setSyncActive } from '../../redux/device-info/actions/set-sync-status.action';

export const useDeviceSyncStatus = () => {
    const syncActive = useSelector((appState: ApplicationState) => appState.deviceInfo.syncActive);
    const dispatch = useDispatch();

    const toggleSync = React.useCallback(() => {
        dispatch(setSyncActive(!syncActive));
    }, [syncActive, dispatch]);

    return { syncActive, toggleSync };
};
