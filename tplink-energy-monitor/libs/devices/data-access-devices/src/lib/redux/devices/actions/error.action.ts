import { DevicesAction, DevicesActionNames } from '../devices-state.type';
import {HttpFetchError} from "@tplink-energy-monitor/shared/utils-shared";

export const devicesErrorAction = (error: HttpFetchError): DevicesAction<{ message: string; status: number }> => ({
    type: DevicesActionNames.DEVICES_ERROR,
    payload: {
        status: error.status,
        message: error.message,
    },
});
