import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../../store';
import { Action } from 'redux';
import { get } from '../../../utils/http.utils';
import { deviceLoading } from './loading.action';
import { TpLinkPlugInfoDto } from '../../../models/devices/tp-link-plug-info.dto';
import { DeviceAction, DeviceActionNames } from '../device-info-state.type';
import { deviceErrorAction } from './error.action';

export const getDeviceInfo = (id: string): ThunkAction<void, ApplicationState, unknown, Action> => async (dispatch) => {
    try {
        dispatch(deviceLoading());
        const devices = await getDevice(id);
        dispatch(devices);
    } catch (error) {
        dispatch(deviceErrorAction(error));
    }
};

const getDevice = async (id: string): Promise<DeviceAction<TpLinkPlugInfoDto>> => {
    const plugInfo = await get<TpLinkPlugInfoDto>(`/api/device/${id}`);

    return {
        type: DeviceActionNames.DEVICE_GET_OK,
        payload: plugInfo,
    } as DeviceAction<TpLinkPlugInfoDto>;
};
