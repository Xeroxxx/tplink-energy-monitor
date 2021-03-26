import { StateStatus } from '../types/state-status.type';
import { UserSettings } from '@tplink-energy-monitor/data-access-user-settings';

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
