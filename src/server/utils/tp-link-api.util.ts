import { Client, Sysinfo } from 'tplink-smarthome-api';
import { AnyDevice } from 'tplink-smarthome-api/lib/client';
import { FullTPLinkPlug } from '../models/devices/tp-link-plug.dto';
import { DeviceEnergyOverview } from '../models/devices/tp-link-plug-info.dto';
import { DailyUsage, mapToDailyEnergyOverview } from '../models/mapper/map-to-daily-enery-usage';

type DeviceDiscoveryCallback = (device: AnyDevice) => void;

export const getAllDevices = (discoveryCallback: DeviceDiscoveryCallback): void => {
    const client = new Client();
    client.startDiscovery().on('device-new', discoveryCallback);
};

export const getDeviceInfo = async (device: FullTPLinkPlug): Promise<void> => {
    const plug = await device.deviceHandle.getSysInfo();
};

export const getDailyDeviceUsage = async (device: FullTPLinkPlug): Promise<DeviceEnergyOverview> => {
    const plug = device.deviceHandle;
    const now = new Date(Date.now());
    const currentMonth = now.getMonth() + 1;

    return mapToDailyEnergyOverview(
        await plug.emeter.getDayStats(now.getFullYear(), currentMonth).then((value) => (value as DailyUsage)?.day_list),
    );
};
