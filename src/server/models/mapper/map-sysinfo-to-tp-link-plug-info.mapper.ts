import { DeviceEnergyOverview, TpLinkPlugInfoDto } from '../devices/tp-link-plug-info.dto';

type PlugInfo = {
    sysInfo: Record<string, unknown>;
    cloud: {
        info: Record<string, unknown>;
    };
    emeter: {
        realtime: Record<string, unknown>;
    };
    schedule: {
        nextAction: Record<string, unknown>;
    };
};

export const mapSysinfoToTPLinkPlugInfo = (
    sysInfo: PlugInfo,
    isActive: boolean,
    id: string,
    dailyUsage: DeviceEnergyOverview,
): TpLinkPlugInfoDto => ({
    id,
    powerOverview: {
        PoverinMw: sysInfo.emeter.realtime.power_mw as number,
        VoltageInMV: sysInfo.emeter.realtime.voltage_mv as number,
        currentMA: sysInfo.emeter.realtime.current_ma as number,
        totalWh: sysInfo.emeter.realtime.total_wh as number,
        voltage: sysInfo.emeter.realtime.voltage as number,
    },
    current: sysInfo.emeter.realtime.current as number,
    errorCode: sysInfo.emeter.realtime.err_code as number,
    power: sysInfo.emeter.realtime.power as number,
    total: sysInfo.emeter.realtime.total as number,
    isActive,
    uptime: sysInfo.sysInfo.on_time as number,
    dailyUsage,
});
