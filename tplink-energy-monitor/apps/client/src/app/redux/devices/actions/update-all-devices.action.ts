import { DevicesAction, DevicesActionNames } from '../devices-state.type';
import { TPLinkPlug } from '../../../models/devices/tp-link-plug.dto';

export const updateAllDevices = (devices: TPLinkPlug[]): DevicesAction<TPLinkPlug[]> => {
    return {
        type: DevicesActionNames.DEVICES_GET_ALL_OK,
            payload: devices,
    };
};
