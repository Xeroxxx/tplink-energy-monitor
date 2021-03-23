import { DevicesAction, DevicesActionNames } from '../devices-state.type';
import { TPLinkPlug } from '@tplink-energy-monitor/data-access-devices';

export const updateAllDevices = (devices: TPLinkPlug[]): DevicesAction<TPLinkPlug[]> => {
    return {
        type: DevicesActionNames.DEVICES_GET_ALL_OK,
            payload: devices,
    };
};
