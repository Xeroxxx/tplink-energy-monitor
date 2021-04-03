import { DeviceAction, DeviceActionNames } from '../device-info-state.type';
import { SocketConnection } from '@tplink-energy-monitor/shared/utils-shared';
import { SetSyncActiveActionCreatorFunc, SyncActiveFuncs } from '../../types/sync-active.type';

const syncActivationFuncs: SyncActiveFuncs = {
    stop: 'stop-device-info',
    start: 'device-info',
};

export const setSyncActive = (syncActive: boolean, id?: string): SetSyncActiveActionCreatorFunc => (
    dispatch,
    getState,
) => {
    const deviceId = id ?? getState().deviceInfo.device?.id;
    const socket = SocketConnection.getInstance();

    if (deviceId) {
        socket.emit(syncActivationFuncs[syncActive ? 'start' : 'stop'], deviceId);
    }

    const action: DeviceAction<boolean> = {
        type: DeviceActionNames.DEVICE_SYNC_STATUS_OK,
        payload: syncActive,
    };

    dispatch(action);
};
