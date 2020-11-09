import { AnyAction, Reducer } from 'redux';
import { DeviceAction, DeviceActionNames, DeviceInfoState } from '../device-info-state.type';
import { TpLinkPlugInfoDto } from '../../../models/devices/tp-link-plug-info.dto';

export const initialDeviceInfoState: DeviceInfoState = {
    status: 'PENDING',
    syncActive: true,
};

const deviceInfoReducer: Reducer<DeviceInfoState> = (
    state: DeviceInfoState = initialDeviceInfoState,
    appAction: AnyAction,
) => {
    const action = appAction as DeviceAction<unknown>;

    switch (action.type) {
        case DeviceActionNames.DEVICE_LOADING:
            return {
                ...state,
                status: 'LOADING',
            };
        case DeviceActionNames.DEVICE_ERROR:
            return {
                ...state,
                status: 'ERROR',
            };
        case DeviceActionNames.DEVICE_GET_OK:
            return {
                ...state,
                status: 'OK',
                device: (action as DeviceAction<TpLinkPlugInfoDto>).payload,
            };
        case DeviceActionNames.DEVICE_SYNC_STATUS_OK:
            return {
                ...state,
                syncActive: (action as DeviceAction<boolean>).payload,
            };
        default:
            return state;
    }
};

export default deviceInfoReducer;
