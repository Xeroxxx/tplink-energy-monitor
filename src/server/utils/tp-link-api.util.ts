import { Client } from 'tplink-smarthome-api';
import { AnyDevice } from 'tplink-smarthome-api/lib/client';
import { FullTPLinkPlug } from '../models/devices/tp-link-plug.dto';
import {
    DeviceEnergyOverview,
    DeviceMonthlyEnergyOverview,
    DeviceRealtimeData,
    RealTimeData,
} from '../models/devices/tp-link-plug-info.dto';
import {
    DailyUsage,
    mapToDailyEnergyOverview,
    mapToYearlyEnergyOverview,
    MonthlyUsage,
    TpLinkEnergyOverview,
    TpLinkMonthlyEnergyOverview,
} from '../models/mapper/map-to-daily-enery-usage';

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

export const getDaysInMonth = (month: number, year: number): number => new Date(year, month, 0).getDate();

const fillFor30Days = (usages: TpLinkEnergyOverview, priorDate: Date): TpLinkEnergyOverview => {
    if (usages.length < 30) {
        return new Array(30).fill({}).map((value, index) => {
            const daysInMonth = getDaysInMonth(priorDate.getMonth() + 1, priorDate.getFullYear());
            const day = ((priorDate.getDate() + index) % daysInMonth) + 1;
            const month =
                priorDate.getDate() + index + 1 > daysInMonth ? priorDate.getMonth() + 2 : priorDate.getMonth() + 1;

            const usageIndex = usages.findIndex((usage) => usage.day === day && usage.month === month);

            if (usageIndex !== -1) {
                return usages[usageIndex];
            }
            return {
                month,
                year: priorDate.getFullYear(),
                energy_wh: 0,
                day,
            };
        });
    }

    return usages;
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

            const priorDate = new Date(new Date().setDate(now.getDate() - dailyThisMonth.length - neededDaysFor30Days));

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

const fillForOneYear = (usages: TpLinkMonthlyEnergyOverview, priorDate: Date): TpLinkMonthlyEnergyOverview => {
    if (usages.length < 12) {
        const monthsToFill = 12 - usages.length;

        return new Array(monthsToFill)
            .fill({})
            .map((value, index) => {
                const month = ((priorDate.getMonth() + index) % 12) + 1;
                const year =
                    priorDate.getMonth() + 1 + index > 12
                        ? new Date(Date.now()).getFullYear()
                        : priorDate.getFullYear();

                return {
                    month,
                    year,
                    energy_wh: 0,
                };
            })
            .concat(usages);
    }

    return usages;
};

export const getLast12MonthUsage = async (device: FullTPLinkPlug): Promise<DeviceMonthlyEnergyOverview> => {
    const plug = device.deviceHandle;
    const now = new Date(Date.now());
    const month = now.getMonth() + 1;

    return mapToYearlyEnergyOverview(
        await plug.emeter.getMonthStats(now.getFullYear()).then(async (value) => {
            const powerUsageThisYear = (value as MonthlyUsage).month_list;

            const neededForOneYear = 12 - month;

            const priorDate = new Date(
                new Date(new Date().setFullYear(now.getFullYear() - 1)).setMonth(12 - neededForOneYear),
            );

            const lastYearUsage = await plug.emeter
                .getMonthStats(now.getFullYear() - 1)
                .then((response) => (response as MonthlyUsage).month_list);

            return fillForOneYear(
                lastYearUsage.filter((usage) => usage.month >= priorDate.getMonth()).concat(powerUsageThisYear),
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
