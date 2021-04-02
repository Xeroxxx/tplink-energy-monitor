import * as React from 'react';
import styles from './sidebar.module.scss';
import { NavBar } from './nav-bar/nav-bar';
import { useNavBarLinks } from '../../../../custom-hooks/nav-bar/use-nav-bar-links.hook';

export const Sidebar: React.FC = () => {
    const { mainNavigationItems, deviceNavigationItems } = useNavBarLinks();

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarTitle}>
                <div className={styles.title}>TP-Link</div>
                <small className={styles.subtitle}>Energy Monitor</small>
            </div>
            <div className={styles.mainNavigation}>
                <NavBar className={styles.navbar} items={mainNavigationItems} />
            </div>
            {deviceNavigationItems && (
                <div className={styles.deviceNavigation}>
                    <div className={styles.sidebarHeader}>Devices</div>
                    <NavBar className={styles.navbar} items={deviceNavigationItems} />
                </div>
            )}
        </div>
    );
};
