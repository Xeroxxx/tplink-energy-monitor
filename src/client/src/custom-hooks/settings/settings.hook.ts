import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../redux/store';
import { loadSettings } from '../../redux/settings/actions/loadsettings.action';

export const useUserSettings = () => {
    const settings = useSelector((appState: ApplicationState) => appState.settings);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (settings.status === 'PENDING') {
            dispatch(loadSettings());
        }
    }, []);

    return settings.settings;
};
