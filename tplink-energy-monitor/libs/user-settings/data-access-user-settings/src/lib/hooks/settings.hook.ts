import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../../../apps/client/src/app/redux/store';
import { loadSettings } from '../redux/actions/loadsettings.action';
import { UserSettings } from '../dto/user-settings.dto';

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
