import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSettings } from '../redux/actions/loadsettings.action';
import { UserSettings } from '../dto/user-settings.dto';
import { AppSettingsState } from '../redux/settings-state.type';

export const useUserSettings = (): UserSettings | undefined => {
    const settings = useSelector((appState: AppSettingsState) => appState.settings);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (settings.status === 'PENDING') {
            dispatch(loadSettings());
        }
    }, []);

    return settings.settings;
};
