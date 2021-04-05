import { Action, applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';
import {
    deviceReducer,
    initialDeviceState,
    deviceInfoReducer,
    initialDeviceInfoState,
} from '@tplink-energy-monitor/data-access-devices';
import { initialSettingsState, settingsReducer } from '@tplink-energy-monitor/user-settings/data-access-user-settings';
import { ApplicationState } from '@tplink-energy-monitor/client/store-types';

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
