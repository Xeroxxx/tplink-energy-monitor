import { Service } from 'typedi';
import { UserSettings } from '../types/user-settings/user-settings.type';

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
