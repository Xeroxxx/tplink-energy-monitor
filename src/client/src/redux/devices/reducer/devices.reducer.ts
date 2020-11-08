import { AnyAction, Reducer } from 'redux';
import { DevicesAction, DevicesActionNames, DeviceState } from '../devices-state.type';
import { TPLinkPlug } from '../../../models/devices/tp-link-plug.dto';

export const initialDeviceState: DeviceState = {
    status: 'PENDING',
    devices: [],
};

const deviceReducer: Reducer<DeviceState> = (state: DeviceState = initialDeviceState, appAction: AnyAction) => {
    const action = appAction as DevicesAction<unknown>;

    switch (action.type) {
        case DevicesActionNames.DEVICES_LOADING:
            return {
                ...state,
                status: 'LOADING',
            };
        case DevicesActionNames.DEVICES_ERROR:
            return {
                ...state,
                status: 'ERROR',
            };
        case DevicesActionNames.DEVICES_GET_ALL_OK:
            return {
                ...state,
                status: 'OK',
                devices: (action as DevicesAction<TPLinkPlug[]>).payload,
            };
        default:
            return state;
    }
};

export default deviceReducer;
