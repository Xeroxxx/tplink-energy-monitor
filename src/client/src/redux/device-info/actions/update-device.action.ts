import { DeviceAction, DeviceActionNames } from '../device-info-state.type';
import { TpLinkPlugInfoDto } from '../../../models/devices/tp-link-plug-info.dto';

export const updateDeviceInfo = (plugInfo: TpLinkPlugInfoDto): DeviceAction<TpLinkPlugInfoDto> => {
    return {
        type: DeviceActionNames.DEVICE_GET_OK,
        payload: plugInfo,
    } as DeviceAction<TpLinkPlugInfoDto>;
};
