import { DevicesAction, DevicesActionNames } from '../devices-state.type';

export const devicesLoading = (): DevicesAction<unknown> => ({
    type: DevicesActionNames.DEVICES_LOADING,
    payload: {},
});
