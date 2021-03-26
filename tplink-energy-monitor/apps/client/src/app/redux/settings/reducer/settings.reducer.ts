import { AnyAction, Reducer } from 'redux';
import { SettingsAction, SettingsActionNames, SettingsState } from '../settings-state.type';
import { UserSettings } from '../../../models/settings/user-settings.dto';

export const initialSettingsState: SettingsState = {
    status: 'PENDING',
};

const settingsReducer: Reducer<SettingsState> = (state: SettingsState = initialSettingsState, appAction: AnyAction) => {
    const action = appAction as SettingsAction<unknown>;

    switch (action.type) {
        case SettingsActionNames.SETTINGS_LOADING:
            return {
                ...state,
                status: 'LOADING',
            };
        case SettingsActionNames.SETTINGS_ERROR:
            return {
                ...state,
                status: 'ERROR',
            };
        case SettingsActionNames.SETTINGS_GET_ALL_OK:
            return {
                ...state,
                status: 'OK',
                settings: (action as SettingsAction<UserSettings>).payload,
            };
        default:
            return state;
    }
};

export default settingsReducer;
