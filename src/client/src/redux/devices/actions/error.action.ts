import { HttpFetchError } from '../../../types/http-fetch-error.class';
import { DevicesAction, DevicesActionNames } from '../devices-state.type';

export const devicesErrorAction = (error: HttpFetchError): DevicesAction<{ message: string; status: number }> => ({
    type: DevicesActionNames.DEVICES_ERROR,
    payload: {
        status: error.status,
        message: error.message,
    },
});
