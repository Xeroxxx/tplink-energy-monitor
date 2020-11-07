import { DeviceActionNames } from '../devices-state.type';

export const devicesLoading = () => ({
    type: DeviceActionNames.DEVICES_LOADING,
    payload: {},
});
