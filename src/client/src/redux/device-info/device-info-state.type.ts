import { StateStatus } from '../types/state-status.type';
import { TpLinkPlugInfoDto } from '../../models/devices/tp-link-plug-info.dto';

export type DeviceInfoState = {
    status: StateStatus;
    device?: TpLinkPlugInfoDto;
    errorMessage?: string;
    errorStatus?: number;
};

export enum DeviceActionNames {
    DEVICE_LOADING = 'DEVICE_LOADING',
    DEVICE_GET_OK = 'DEVICE_GET_OK',
    DEVICE_ERROR = 'DEVICE_ERROR',
}

export type DeviceAction<T> = {
    type: DeviceActionNames;
    payload: T;
};
