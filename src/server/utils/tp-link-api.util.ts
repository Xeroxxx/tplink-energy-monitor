import { Client } from 'tplink-smarthome-api';
import { AnyDevice } from 'tplink-smarthome-api/lib/client';
import { FullTPLinkPlug } from '../models/devices/tp-link-plug.dto';
import { DeviceEnergyOverview, DeviceRealtimeData, RealTimeData } from '../models/devices/tp-link-plug-info.dto';
import { DailyUsage, mapToDailyEnergyOverview } from '../models/mapper/map-to-daily-enery-usage';

type DeviceDiscoveryCallback = (device: AnyDevice) => void;

export const getAllDevices = (discoveryCallback: DeviceDiscoveryCallback): void => {
    const client = new Client();
    client.startDiscovery().on('device-new', discoveryCallback);
};

export const getDailyDeviceUsage = async (device: FullTPLinkPlug): Promise<DeviceEnergyOverview> => {
    const plug = device.deviceHandle;
    const now = new Date(Date.now());
    const currentMonth = now.getMonth() + 1;

    return mapToDailyEnergyOverview(
        await plug.emeter.getDayStats(now.getFullYear(), currentMonth).then((value) => (value as DailyUsage)?.day_list),
    );
};

export const getRealtimeData = async (device: FullTPLinkPlug): Promise<DeviceRealtimeData> => {
    const plug = device.deviceHandle;

    return plug.emeter.getRealtime().then((data) => ({
        voltageMv: (data as RealTimeData).voltage_mv,
        currentMa: (data as RealTimeData).current_ma,
        powerMw: (data as RealTimeData).current_ma,
        totalWh: (data as RealTimeData).total_wh,
        errCode: (data as RealTimeData).err_code,
        current: (data as RealTimeData).current,
        power: (data as RealTimeData).power,
        total: (data as RealTimeData).total,
        voltage: (data as RealTimeData).voltage,
    }));
};

export const setPowerState = async (device: FullTPLinkPlug, newPowerState: boolean): Promise<void> => {
    const plug = device.deviceHandle;

    await plug.setPowerState(newPowerState);
};
