import { Client } from 'tplink-smarthome-api';
import { AnyDevice } from 'tplink-smarthome-api/lib/client';

type DeviceDiscoveryCallback = (device: AnyDevice) => void;

export const getAllDevices = (discoveryCallback: DeviceDiscoveryCallback): void => {
    const client = new Client();

    client.startDiscovery().on('device-new', discoveryCallback);
};
