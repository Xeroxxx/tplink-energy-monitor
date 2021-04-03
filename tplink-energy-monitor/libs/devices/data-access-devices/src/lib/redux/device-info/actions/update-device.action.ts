import { DeviceAction, DeviceActionNames } from '../device-info-state.type';
import { TpLinkPlugInfoDto } from '@tplink-energy-monitor/data-access-devices';

export const updateDeviceInfo = (plugInfo: TpLinkPlugInfoDto): DeviceAction<TpLinkPlugInfoDto> =>
    ({
        type: DeviceActionNames.DEVICE_GET_OK,
        payload: plugInfo,
    } as DeviceAction<TpLinkPlugInfoDto>);
