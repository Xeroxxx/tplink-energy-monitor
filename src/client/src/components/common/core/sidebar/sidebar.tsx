import * as React from 'react';
import styles from './sidebar.module.scss';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../redux/store';
import { NavBar, NavBarItem } from './nav-bar/nav-bar';
import { faHome, faPlug, faTools } from '@fortawesome/free-solid-svg-icons';
import { TPLinkPlug } from '../../../../models/devices/tp-link-plug.dto';
import { useLocation } from 'react-router-dom';

const mainNavbarItems: NavBarItem[] = [
    {
        linkText: 'Dashboard',
        url: '/',
        icon: faHome,
        isActive: false,
    },
    {
        linkText: 'Settings',
        url: '/settings',
        icon: faTools,
        isActive: false,
    },
];

const mapToNavBarItem = (device: TPLinkPlug): NavBarItem => ({
    className: '',
    icon: faPlug,
    linkText: device.alias,
    url: `/device/${device.id}`,
    isActive: false,
});

export const Sidebar: React.FC = () => {
    const [items, setItems] = React.useState<NavBarItem[]>(mainNavbarItems);
    const [deviceItems, setDeviceItems] = React.useState<NavBarItem[]>();

    const deviceState = useSelector((appState: ApplicationState) => appState.devices);
    const location = useLocation();

    React.useEffect(() => {
        if (deviceState.status === 'OK' && deviceState.devices.length > 0) {
            setDeviceItems(deviceState.devices.map((device) => mapToNavBarItem(device)));
        }
    }, [deviceState]);

    React.useEffect(() => {
        setItems(
            items.map((item) => {
                return item.url === location.pathname ? { ...item, isActive: true } : { ...item, isActive: false };
            }),
        );
        setDeviceItems((prevstate) =>
            prevstate?.map((item) => {
                return item.url === location.pathname ? { ...item, isActive: true } : { ...item, isActive: false };
            }),
        );
    }, [location]);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarTitle}>
                <div className={styles.title}>TP-Link</div>
                <small className={styles.subtitle}>Energy Monitor</small>
            </div>
            <div className={styles.mainNavigation}>
                <NavBar className={styles.navbar} items={items} />
            </div>
            {deviceItems && (
                <div className={styles.deviceNavigation}>
                    <div className={styles.sidebarHeader}>Devices</div>
                    <NavBar className={styles.navbar} items={deviceItems} />
                </div>
            )}
        </div>
    );
};
