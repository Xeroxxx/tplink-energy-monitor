// eslint-disable-next-line
import type { DeviceState, DeviceInfoState } from '@tplink-energy-monitor/data-access-devices';
// eslint-disable-next-line
import type { SettingsState } from '@tplink-energy-monitor/user-settings/data-access-user-settings';

export type ApplicationState = {
    devices: DeviceState;
    deviceInfo: DeviceInfoState;
    settings: SettingsState;
};
