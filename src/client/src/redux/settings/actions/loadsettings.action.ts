import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../../store';
import { Action } from 'redux';
import { get } from '../../../utils/http.utils';
import { SettingsAction, SettingsActionNames } from '../settings-state.type';
import { UserSettings } from '../../../models/settings/user-settings.dto';

export const loadSettings = (): ThunkAction<void, ApplicationState, unknown, Action> => async (dispatch) => {
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

const loadUserSettings = async (): Promise<SettingsAction<UserSettings>> => {
    const settings = await get<UserSettings>('/api/settings');

    return {
        type: SettingsActionNames.SETTINGS_GET_ALL_OK,
        payload: settings,
    } as SettingsAction<UserSettings>;
};
