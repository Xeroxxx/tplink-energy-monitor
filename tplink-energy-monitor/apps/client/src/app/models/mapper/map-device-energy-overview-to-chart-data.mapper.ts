import { DeviceEnergyOverview, DeviceMonthlyEnergyOverview } from '../devices/tp-link-plug-info.dto';

export const mapDeviceEnergyOverviewToChartData = (deviceEnergy: DeviceEnergyOverview): number[] => {
    return deviceEnergy?.map((value) => value.energyWh / 1000);
};

export const mapDeviceEnergyOverviewToCharLabels = (deviceEnergy: DeviceEnergyOverview): string[] => {
    return deviceEnergy?.map((value) => `${value.month} / ${value.day}`);
};

export const mapDeviceMonthlyEnergyOverviewToChartData = (deviceEnergy: DeviceMonthlyEnergyOverview): number[] => {
    return deviceEnergy?.map((value) => value.energyWh / 1000);
};

export const mapDeviceMonthlyEnergyOverviewToCharLabels = (deviceEnergy: DeviceMonthlyEnergyOverview): string[] => {
    return deviceEnergy?.map((value) => `${value.year} / ${value.month}`);
};