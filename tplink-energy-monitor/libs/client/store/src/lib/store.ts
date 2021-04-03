import { Action, applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';
import deviceReducer, { initialDeviceState } from '../../../../devices/data-access-devices/src/lib/redux/devices/reducer/devices.reducer';
import { DeviceState } from '../../../../devices/data-access-devices/src/lib/redux/devices/devices-state.type';
import deviceInfoReducer, { initialDeviceInfoState } from '../../../../devices/data-access-devices/src/lib/redux/device-info/reducer/device-info.reducer';
import { DeviceInfoState } from '../../../../devices/data-access-devices/src/lib/redux/device-info/device-info-state.type';
import {
    SettingsState,
    initialSettingsState,
    settingsReducer,
} from '@tplink-energy-monitor/user-settings/data-access-user-settings';

export type ApplicationState = {
    devices: DeviceState;
    deviceInfo: DeviceInfoState;
    settings: SettingsState;
};

export const initialAppState: ApplicationState = {
    devices: initialDeviceState,
    deviceInfo: initialDeviceInfoState,
    settings: initialSettingsState,
};

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    devices: deviceReducer,
    deviceInfo: deviceInfoReducer,
    settings: settingsReducer,
});

export function configureStore(history: History, initialState: ApplicationState): Store<ApplicationState> {
    const composeEnhancers = composeWithDevTools({});

    return createStore<ApplicationState, Action<unknown>, unknown, unknown>(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
    );
}
