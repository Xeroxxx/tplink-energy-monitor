import { NavBarItem } from '../../../components/core/sidebar/nav-bar/nav-bar';
import { faHome, faTools } from '@fortawesome/free-solid-svg-icons';

export const mainNavbarItems: NavBarItem[] = [
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
