import { TPLinkPlug } from '../../models/devices/tp-link-plug.dto';
import { StateStatus } from '../types/state-status.type';

export type DeviceState = {
    status: StateStatus;
    devices: TPLinkPlug[];
    errorMessage?: string;
    errorStatus?: number;
};

export enum DeviceActionNames {
    DEVICES_LOADING = 'DEVICES_LOADING',
    DEVICES_GET_ALL_OK = 'DEVICES_GET_ALL_OK',
    DEVICES_ERROR = 'DEVICES_ERROR',
}

export type DeviceAction<T> = {
    type: DeviceActionNames;
    payload: T;
};
