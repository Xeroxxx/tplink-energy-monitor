import { StateStatus } from '../types/state-status.type';
import { TpLinkPlugInfoDto } from '@tplink-energy-monitor/data-access-devices';

export type DeviceInfoState = {
    status: StateStatus;
    syncActive?: boolean;
    device?: TpLinkPlugInfoDto;
    errorMessage?: string;
    errorStatus?: number;
};

export enum DeviceActionNames {
    DEVICE_LOADING = 'DEVICE_LOADING',
    DEVICE_SYNC_STATUS_OK = 'DEVICE_SYNC_STATUS_OK',
    DEVICE_GET_OK = 'DEVICE_GET_OK',
    DEVICE_ERROR = 'DEVICE_ERROR',
    DEVICE_RESET = 'DEVICE_RESET',
}

export type DeviceAction<T> = {
    type: DeviceActionNames;
    payload: T;
};
