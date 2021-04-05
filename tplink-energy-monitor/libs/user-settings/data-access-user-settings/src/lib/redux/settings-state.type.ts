import { UserSettings } from '../dto/user-settings.dto';

export type StateStatus = 'OK' | 'LOADING' | 'ERROR' | 'PENDING';

export type AppSettingsState = {
    settings: SettingsState;
};

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
