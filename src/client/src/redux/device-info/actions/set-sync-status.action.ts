import { DeviceAction, DeviceActionNames } from '../device-info-state.type';

export const setSyncActive = (syncActive: boolean): DeviceAction<boolean> => ({
    type: DeviceActionNames.DEVICE_SYNC_STATUS_OK,
    payload: syncActive,
});
