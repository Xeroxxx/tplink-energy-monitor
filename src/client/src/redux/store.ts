import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';
import deviceReducer, { initialDeviceState } from './devices/reducer/devices.reducer';
import { DeviceState } from './devices/devices-state.type';
import deviceInfoReducer, { initialDeviceInfoState } from './device-info/reducer/device-info.reducer';
import { DeviceInfoState } from './device-info/device-info-state.type';

export type ApplicationState = {
    devices: DeviceState;
    deviceInfo: DeviceInfoState;
};

export const initialAppState: ApplicationState = {
    devices: initialDeviceState,
    deviceInfo: initialDeviceInfoState,
};

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    devices: deviceReducer,
    deviceInfo: deviceInfoReducer,
});

export default function configureStore(history: History, initialState: ApplicationState): Store<ApplicationState> {
    const composeEnhancers = composeWithDevTools({});

    // @ts-ignore
    return createStore<ApplicationState>(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
    );
}
