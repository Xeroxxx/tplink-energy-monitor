import { HttpFetchError } from '../../../types/http-fetch-error.class';
import { DeviceAction, DeviceActionNames } from '../device-info-state.type';

export const deviceErrorAction = (error: HttpFetchError): DeviceAction<{ message: string; status: number }> => ({
    type: DeviceActionNames.DEVICE_ERROR,
    payload: {
        status: error.status,
        message: error.message,
    },
});
