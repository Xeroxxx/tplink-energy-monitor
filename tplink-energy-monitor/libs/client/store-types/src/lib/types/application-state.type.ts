import { DeviceState } from '@tplink-energy-monitor/data-access-devices';
import { DeviceInfoState } from '@tplink-energy-monitor/data-access-devices';
import { SettingsState } from '@tplink-energy-monitor/user-settings/data-access-user-settings';

export type ApplicationState = {
    devices: DeviceState;
    deviceInfo: DeviceInfoState;
    settings: SettingsState;
};
