import { TPLinkPlug } from '@tplink-energy-monitor/data-access-devices';
import { StateStatus } from '../types/state-status.type';

export type DeviceState = {
    status: StateStatus;
    devices: TPLinkPlug[];
    errorMessage?: string;
    errorStatus?: number;
};

export enum DevicesActionNames {
    DEVICES_LOADING = 'DEVICES_LOADING',
    DEVICES_GET_ALL_OK = 'DEVICES_GET_ALL_OK',
    DEVICES_ERROR = 'DEVICES_ERROR',
}

export type DevicesAction<T> = {
    type: DevicesActionNames;
    payload: T;
};
