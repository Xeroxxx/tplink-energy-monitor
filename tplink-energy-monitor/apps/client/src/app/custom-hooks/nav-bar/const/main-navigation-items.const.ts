import { NavBarItem } from '../../../components/core/sidebar/nav-bar/nav-bar';
import { faHome, faTools, faList, faChartBar } from '@fortawesome/free-solid-svg-icons';

export const mainNavbarItems: NavBarItem[] = [
    {
        linkText: 'Dashboard',
        url: '/',
        icon: faHome,
        isActive: false,
    },
    {
        linkText: 'Show Devices',
        url: '/device-list',
        icon: faList,
        isActive: false,
        isMobileButton: true,
    },
    {
        linkText: 'Overall Statistics',
        url: '/statistics',
        icon: faChartBar,
        isActive: false,
    },
    {
        linkText: 'Settings',
        url: '/settings',
        icon: faTools,
        isActive: false,
    },
];
