import { StateStatus } from '../../../../../../apps/client/src/app/redux/types/state-status.type';
import { UserSettings } from '../dto/user-settings.dto';

export type SettingsState = {
    status: StateStatus;
    settings?: UserSettings;
};

export enum SettingsActionNames {
    SETTINGS_LOADING = 'SETTINGS_LOADING',
    SETTINGS_GET_ALL_OK = 'SETTINGS_GET_ALL_OK',
    SETTINGS_ERROR = 'SETTINGS_ERROR',
}

export type SettingsAction<T> = {
    type: SettingsActionNames;
    payload?: T;
};
