import * as React from 'react';
import { TextCard } from '@tplink-energy-monitor/ui-shared';
import styles from './settings.module.scss';
import { useUserSettings } from '@tplink-energy-monitor/user-settings/data-access-user-settings';

export const Settings: React.FC = () => {
    const userSettings = useUserSettings();

    const energyCosts = React.useMemo(
        () =>
            `${userSettings ? userSettings.energyCosts / 100 : '-'}${userSettings ? ` ${userSettings.currency}` : ''}`,
        [userSettings],
    );

    return (
        <div className={`flex-col ${styles.settingsView}`}>
            <h1 className="flex-center">Settings</h1>
            <TextCard headline={energyCosts} subtitle="Energy Costs" />
        </div>
    );
};
