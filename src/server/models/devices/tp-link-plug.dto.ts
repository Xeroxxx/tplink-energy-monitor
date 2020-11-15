import { TpLinkDeviceTypes } from '../../types/devices/device-type.enum';
import { Plug } from 'tplink-smarthome-api';
import { DeviceEnergyOverview, DeviceMonthlyEnergyOverview } from './tp-link-plug-info.dto';

export type TPLinkPlug = {
    id: string;
    name: string;
    alias: string;
    type: TpLinkDeviceTypes;
    model: string;
    deviceName: string;
    relayState: boolean;
    hwId: string;
    host: string;
    swVersion: string;
    hwVersion: string;
    last30Days: DeviceEnergyOverview;
    last12Month: DeviceMonthlyEnergyOverview;
};

export type FullTPLinkPlug = {
    deviceHandle: Plug;
    port: number;
    macAddress: string;
} & TPLinkPlug;
