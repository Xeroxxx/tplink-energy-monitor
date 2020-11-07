import { TpLinkDeviceTypes } from './device-type.enum';

export type TPLinkPlug = {
    id: string;
    name: string;
    alias: string;
    type: TpLinkDeviceTypes;
    model: string;
    macAddress: string;
    deviceName: string;
    relayState: boolean;
    hwId: string;
};
