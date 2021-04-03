import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AppSettingsState, SettingsAction, SettingsActionNames } from '../settings-state.type';
import { UserSettings } from '../../dto/user-settings.dto';
import { get } from '@tplink-energy-monitor/shared/utils-shared';

const loadUserSettings = async (): Promise<SettingsAction<UserSettings>> => {
    const settings = await get<UserSettings>('/api/settings');

    return {
        type: SettingsActionNames.SETTINGS_GET_ALL_OK,
        payload: settings,
    } as SettingsAction<UserSettings>;
};

export const loadSettings = (): ThunkAction<void, AppSettingsState, unknown, Action> => async (dispatch) => {
    try {
        dispatch({
            type: SettingsActionNames.SETTINGS_LOADING,
        });

        const devices = await loadUserSettings();
        dispatch(devices);
    } catch (error) {
        dispatch({
            type: SettingsActionNames.SETTINGS_ERROR,
            payload: error,
        });
    }
};
