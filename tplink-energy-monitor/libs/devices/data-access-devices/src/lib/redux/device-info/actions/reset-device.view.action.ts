import { DeviceAction, DeviceActionNames } from '../device-info-state.type';

export const resetDeviceView = (): DeviceAction<undefined> => ({
    type: DeviceActionNames.DEVICE_RESET,
    payload: undefined,
});
