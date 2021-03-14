import { useSelector } from 'react-redux';
import { ApplicationState } from '../../redux/store';
import * as React from 'react';
import { NavBarItem } from '../../components/common/core/sidebar/nav-bar/nav-bar';
import { useLocation } from 'react-router-dom';
import { mapToNavBarItem } from './mapper/nav-bar-item.mapper';
import { mainNavbarItems } from './const/main-navigation-items.const';

export const useNavBarLinks = () => {
    const deviceState = useSelector((appState: ApplicationState) => appState.devices);
    const [items, setItems] = React.useState<NavBarItem[]>(mainNavbarItems);
    const [deviceItems, setDeviceItems] = React.useState<NavBarItem[]>();

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

    return { mainNavigationItems: items, deviceNavigationItems: deviceItems };
};
