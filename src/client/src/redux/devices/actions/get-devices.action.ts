import { TPLinkPlug } from '../../../models/devices/tp-link-plug.dto';
import { DeviceAction, DeviceActionNames } from '../devices-state.type';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../../store';
import { Action } from 'redux';
import { get } from '../../../utils/http.utils';
import { devicesLoading } from './loading.action';
import { deviceErrorAction } from './error.action';

export const getAllDevices = (): ThunkAction<void, ApplicationState, unknown, Action> => async (dispatch) => {
    try {
        dispatch(devicesLoading);
        const devices = await getDevices();
        dispatch(devices);
    } catch (error) {
        dispatch(deviceErrorAction(error));
    }
};

const getDevices = async (): Promise<DeviceAction<TPLinkPlug[]>> => {
    const devices = await get<TPLinkPlug[]>('/api/devices');

    return {
        type: DeviceActionNames.DEVICES_GET_ALL_OK,
        payload: devices,
    } as DeviceAction<TPLinkPlug[]>;
};