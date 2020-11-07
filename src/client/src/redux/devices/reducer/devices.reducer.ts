import { AnyAction, Reducer } from 'redux';
import { DeviceAction, DeviceActionNames, DeviceState } from '../devices-state.type';
import { TPLinkPlug } from '../../../models/devices/tp-link-plug.dto';

export const initialDeviceState: DeviceState = {
    status: 'PENDING',
    devices: [],
};

const deviceReducer: Reducer<DeviceState> = (state: DeviceState = initialDeviceState, appAction: AnyAction) => {
    const action = appAction as DeviceAction<unknown>;

    switch (action.type) {
        case DeviceActionNames.DEVICES_LOADING:
            return {
                ...state,
                status: 'LOADING',
            };
        case DeviceActionNames.DEVICES_ERROR:
            return {
                ...state,
                status: 'ERROR',
            };
        case DeviceActionNames.DEVICES_GET_ALL_OK:
            return {
                ...state,
                status: 'OK',
                devices: (action as DeviceAction<TPLinkPlug[]>).payload,
            };
        default:
            return state;
    }
};

export default deviceReducer;
