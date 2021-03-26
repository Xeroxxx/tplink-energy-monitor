import { DeviceEnergyOverview, DeviceMonthlyEnergyOverview } from '@tplink-energy-monitor/data-access-devices';

export type TpLinkEnergyOverview = Array<{
    year: number;
    month: number;
    day: number;
    // eslint-disable-next-line camelcase
    energy_wh: number;
}>;

export type DailyUsage = {
    // eslint-disable-next-line camelcase
    day_list: TpLinkEnergyOverview;
};

export type TpLinkMonthlyEnergyOverview = Array<{
    year: number;
    month: number;
    // eslint-disable-next-line camelcase
    energy_wh: number;
}>;

export type MonthlyUsage = {
    // eslint-disable-next-line camelcase
    month_list: TpLinkMonthlyEnergyOverview;
};

export const mapToDailyEnergyOverview = (usage: TpLinkEnergyOverview): DeviceEnergyOverview =>
    usage.map((item) => ({
        year: item.year,
        month: item.month,
        day: item.day,
        energyWh: item.energy_wh,
    }));

export const mapToYearlyEnergyOverview = (usage: TpLinkMonthlyEnergyOverview): DeviceMonthlyEnergyOverview =>
    usage.map((item) => ({
        year: item.year,
        month: item.month,
        energyWh: item.energy_wh,
    }));
