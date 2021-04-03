import * as React from 'react';
import { useUserSettings } from '../../../custom-hooks/settings/settings.hook';
import { TextCard } from '@tplink-energy-monitor/ui-shared';
import styles from './settings.module.scss';

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
