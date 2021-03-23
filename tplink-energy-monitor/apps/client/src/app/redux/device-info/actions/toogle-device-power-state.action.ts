import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../../store';
import { Action } from 'redux';
import { deviceErrorAction } from './error.action';
import { DeviceAction, DeviceActionNames } from '../device-info-state.type';
import { ChangePowerStateDto } from '@tplink-energy-monitor/data-access-devices';
import { put } from '../../../utils/http.utils';

export const toggleDevicePowerState = (
    id: string,
    newPowerState: boolean,
): ThunkAction<void, ApplicationState, unknown, Action> => async (dispatch) => {
    try {
        const devices = await setPowerState(id, newPowerState);
        dispatch(devices);
    } catch (error) {
        dispatch(deviceErrorAction(error));
    }
};

const setPowerState = async (id: string, newPowerState: boolean): Promise<DeviceAction<undefined>> => {
    const powerStateChangeDto = {
        id,
        powerState: newPowerState,
    };

    await put<ChangePowerStateDto>(`/api/device/${id}/power-state`, powerStateChangeDto);

    return {
        type: DeviceActionNames.DEVICE_GET_OK,
    } as DeviceAction<undefined>;
};
