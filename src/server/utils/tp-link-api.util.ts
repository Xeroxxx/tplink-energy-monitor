import { Client } from 'tplink-smarthome-api';
import { AnyDevice } from 'tplink-smarthome-api/lib/client';
import { FullTPLinkPlug } from '../models/devices/tp-link-plug.dto';
import { DeviceEnergyOverview, DeviceRealtimeData, RealTimeData } from '../models/devices/tp-link-plug-info.dto';
import { DailyUsage, mapToDailyEnergyOverview, TpLinkEnergyOverview } from '../models/mapper/map-to-daily-enery-usage';
import { daysInMonth } from './date.utils';

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

const fillFor30Days = (usages: TpLinkEnergyOverview, priorDate: Date): TpLinkEnergyOverview => {
    const daysToFill = usages[0].day - priorDate.getDate();
    const filledArray: TpLinkEnergyOverview = new Array(daysToFill)
        .fill({})
        .map((value, index) => {
            return {
                month: priorDate.getMonth() + 1,
                year: priorDate.getFullYear(),
                energy_wh: 0,
                day: priorDate.getDate() + index,
            };
        })
        .concat(usages);

    return usages.length === 30 ? usages : filledArray;
};

export const getLast30DaysUsage = async (device: FullTPLinkPlug): Promise<DeviceEnergyOverview> => {
    const plug = device.deviceHandle;
    const now = new Date(Date.now());
    const currentMonth = now.getMonth() + 1;

    return mapToDailyEnergyOverview(
        await plug.emeter.getDayStats(now.getFullYear(), currentMonth).then(async (value) => {
            const dailyThisMonth = (value as DailyUsage)?.day_list;

            if (dailyThisMonth.length >= 30) {
                return dailyThisMonth;
            }

            const neededDaysFor30Days = 30 - dailyThisMonth.length;

            const priorDate = new Date(
                new Date().setDate(now.getDate() - dailyThisMonth.length - neededDaysFor30Days + 1),
            );

            const lastMonthUsage = await plug.emeter
                .getDayStats(now.getFullYear(), currentMonth - 1)
                .then((response) => (response as DailyUsage).day_list);

            return fillFor30Days(
                lastMonthUsage.filter((usage) => usage.day >= priorDate.getDate()).concat(dailyThisMonth),
                priorDate,
            );
        }),
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
