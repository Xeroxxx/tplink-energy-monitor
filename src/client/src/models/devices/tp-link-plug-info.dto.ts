export type DeviceEnergyOverview = Array<{
    year: number;
    month: number;
    day: number;
    energyWh: number;
}>;

type PowerOverview = {
    VoltageInMV: number;
    currentMA: number;
    PoverinMw: number;
    totalWh: number;
    voltage: number;
};

export type DeviceRealtimeData = {
    voltageMv: number;
    currentMa: number;
    powerMw: number;
    totalWh: number;
    errCode: number;
    current: number;
    power: number;
    total: number;
    voltage: number;
};

export type TpLinkPlugInfoDto = {
    id: string;
    powerOverview: PowerOverview;
    errorCode: number;
    current: number;
    power: number;
    total: number;
    isActive: boolean;
    uptime: number;
    dailyUsage: DeviceEnergyOverview;
    realTime: DeviceRealtimeData;
    last30Days: DeviceEnergyOverview;
};

export type ChangePowerStateDto = {
    id: string;
    powerState: boolean;
};
