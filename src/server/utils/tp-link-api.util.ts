import { Client, Sysinfo } from 'tplink-smarthome-api';
import { AnyDevice } from 'tplink-smarthome-api/lib/client';
import { FullTPLinkPlug } from '../models/devices/tp-link-plug.dto';

type DeviceDiscoveryCallback = (device: AnyDevice) => void;

export const getAllDevices = (discoveryCallback: DeviceDiscoveryCallback): void => {
    const client = new Client();

    client.startDiscovery().on('device-new', discoveryCallback);
};

export const getDeviceInfo = async (device: FullTPLinkPlug): Promise<void> => {
    const plug = await device.deviceHandle.getSysInfo();
};
