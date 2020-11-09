import { DeviceEnergyOverview } from '../devices/tp-link-plug-info.dto';

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

export const mapToDailyEnergyOverview = (usage: TpLinkEnergyOverview): DeviceEnergyOverview =>
    usage.map((item) => ({
        year: item.year,
        month: item.month,
        day: item.day,
        energyWh: item.energy_wh,
    }));
