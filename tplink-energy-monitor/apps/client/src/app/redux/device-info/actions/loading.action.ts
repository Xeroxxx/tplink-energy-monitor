import { DeviceAction, DeviceActionNames } from '../device-info-state.type';

export const deviceLoading = (): DeviceAction<unknown> => ({
    type: DeviceActionNames.DEVICE_LOADING,
    payload: {},
});
