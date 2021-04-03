import { TPLinkPlug } from '@tplink-energy-monitor/data-access-devices';
import { NavBarItem } from '../../../components/core/sidebar/nav-bar/nav-bar';
import { faPlug } from '@fortawesome/free-solid-svg-icons';

export const mapToNavBarItem = (device: TPLinkPlug): NavBarItem => ({
    className: '',
    icon: faPlug,
    linkText: device.alias,
    url: `/device/${device.id}`,
    isActive: false,
});
