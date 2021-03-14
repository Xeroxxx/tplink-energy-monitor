import { TPLinkPlug } from '../../../models/devices/tp-link-plug.dto';
import { NavBarItem } from '../../../components/common/core/sidebar/nav-bar/nav-bar';
import { faPlug } from '@fortawesome/free-solid-svg-icons';

export const mapToNavBarItem = (device: TPLinkPlug): NavBarItem => ({
    className: '',
    icon: faPlug,
    linkText: device.alias,
    url: `/device/${device.id}`,
    isActive: false,
});
