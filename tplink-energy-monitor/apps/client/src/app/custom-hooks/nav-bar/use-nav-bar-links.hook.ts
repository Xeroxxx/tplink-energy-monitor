import { useSelector } from 'react-redux';
import { ApplicationState } from '../../redux/store';
import * as React from 'react';
import { NavBarItem } from '../../components/common/core/sidebar/nav-bar/nav-bar';
import { useLocation } from 'react-router-dom';
import { mapToNavBarItem } from './mapper/nav-bar-item.mapper';
import { mainNavbarItems } from './const/main-navigation-items.const';
import { NavButtonProps } from '../../components/common/core/sidebar/nav-bar/nav-button/nav-button';

type NavBarLinks = {
    mainNavigationItems: NavButtonProps[];
    deviceNavigationItems: NavButtonProps[] | undefined;
};

export const useNavBarLinks = (): NavBarLinks => {
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
        setItems(items.map((item) => ({ ...item, isActive: item.url === location.pathname })));
        setDeviceItems((prevstate) =>
            prevstate?.map((item) => ({ ...item, isActive: item.url === location.pathname })),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return { mainNavigationItems: items, deviceNavigationItems: deviceItems };
};
