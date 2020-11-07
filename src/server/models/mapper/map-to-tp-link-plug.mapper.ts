import { Plug, PlugSysinfo } from 'tplink-smarthome-api';
import { TpLinkDeviceTypes } from '../../types/devices/device-type.enum';
import { TPLinkPlug } from '../devices/tp-link-plug.dto';

export const mapToTPLinkPlug = (device: Plug, info: PlugSysinfo): TPLinkPlug => ({
    id: device.deviceId,
    name: info.dev_name || '',
    alias: device.alias,
    type: device.type as TpLinkDeviceTypes,
    model: device.model,
    macAddress: device.mac,
    deviceName: device.name,
    relayState: device.relayState,
    hwId: info.hw_ver,
});
