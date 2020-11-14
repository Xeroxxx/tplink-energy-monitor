import { TpLinkDeviceTypes } from '../../types/devices/device-type.enum';
import { Plug } from 'tplink-smarthome-api';

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
};

export type FullTPLinkPlug = {
    deviceHandle: Plug;
    port: number;
    macAddress: string;
} & TPLinkPlug;
