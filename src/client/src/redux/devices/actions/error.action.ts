import { HttpFetchError } from '../../../types/http-fetch-error.class';
import { DeviceAction, DeviceActionNames } from '../devices-state.type';

export const deviceErrorAction = (error: HttpFetchError): DeviceAction<{ message: string; status: number }> => ({
    type: DeviceActionNames.DEVICES_ERROR,
    payload: {
        status: error.status,
        message: error.message,
    },
});
