import { DeviceEnergyOverview } from '../../models/devices/tp-link-plug-info.dto';

export const getTodaysPowerUsage = (energy: DeviceEnergyOverview): string => {
    const now = new Date(Date.now());
    const currentMonth = now.getMonth() + 1;

    const todaysUsage = energy.find(
        (value) => value.month === currentMonth && value.year === now.getFullYear() && value.day === now.getDate(),
    );

    return `${todaysUsage ? transformMilliValueToFixed(todaysUsage.energyWh) : '-'} kWh`;
};

export const getThisMonthPowerUsage = (energy: DeviceEnergyOverview): string => {
    const usageThisMonth = energy.reduce((acc, prev) => acc + prev.energyWh, 0);

    return `${usageThisMonth ? transformMilliValueToFixed(usageThisMonth) : '-'} kWh`;
};

export const transformMilliValueToFixed = (watthours: number) => (watthours / 1000).toFixed(2);
