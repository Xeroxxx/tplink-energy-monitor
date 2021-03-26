import { DevicesActionNames } from '../devices-state.type';

export const devicesLoading = () => ({
    type: DevicesActionNames.DEVICES_LOADING,
    payload: {},
});
