import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../redux/store';
import { loadSettings } from '../../redux/settings/actions/loadsettings.action';
import { UserSettings } from '@tplink-energy-monitor/data-access-user-settings';

export const useUserSettings = (): UserSettings | undefined => {
    const settings = useSelector((appState: ApplicationState) => appState.settings);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (settings.status === 'PENDING') {
            dispatch(loadSettings());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return settings.settings;
};
