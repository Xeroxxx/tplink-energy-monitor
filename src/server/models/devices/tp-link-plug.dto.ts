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
};

export type FullTPLinkPlug = {
    deviceHandle: Plug;
    host: string;
    port: number;
    macAddress: string;
} & TPLinkPlug;
