import { Plug, PlugSysinfo } from 'tplink-smarthome-api';
import { TpLinkDeviceTypes } from '../../types/devices/device-type.enum';
import { FullTPLinkPlug, TPLinkPlug } from '../devices/tp-link-plug.dto';

export const mapToFullTPLinkPlug = (device: Plug, info: PlugSysinfo): FullTPLinkPlug => ({
    id: device.deviceId,
    name: info.dev_name || '',
    alias: device.alias,
    type: device.type as TpLinkDeviceTypes,
    model: device.model,
    macAddress: device.mac,
    deviceName: device.name,
    relayState: device.relayState,
    hwId: info.hw_ver,
    host: device.host,
    port: device.port,
    deviceHandle: device,
    swVersion: info.sw_ver,
    hwVersion: info.hw_ver,
    last12Month: [],
    last30Days: [],
});

export const mapFullTPLinkPlugToTPLinkPlug = (plug: FullTPLinkPlug): TPLinkPlug => ({
    alias: plug.alias,
    deviceName: plug.deviceName,
    hwId: plug.hwId,
    id: plug.id,
    model: plug.model,
    name: plug.name,
    relayState: plug.relayState,
    type: plug.type,
    host: plug.host,
    hwVersion: plug.hwVersion,
    swVersion: plug.swVersion,
    last30Days: plug.last30Days,
    last12Month: plug.last12Month,
});
