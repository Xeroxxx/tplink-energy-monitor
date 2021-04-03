import { Service } from 'typedi';
import { UserSettings } from '@tplink-energy-monitor/user-settings/data-access-user-settings';

const defaultUserSettings: UserSettings = {
    energyCosts: 29,
    currency: 'EUR',
};

@Service()
export default class SettingsService {
    public loadSettings(): UserSettings {
        return defaultUserSettings;
    }
}
