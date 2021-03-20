import { Service } from 'typedi';
import { UserSettings } from '../models/user-settings/user-settings.dto';

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
