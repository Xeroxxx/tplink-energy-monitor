import * as React from 'react';
import styles from './device-view-footer.module.scss';
import { TPLinkPlug } from '@tplink-energy-monitor/data-access-devices';
import { DeviceDetails } from './device-details';

type DeviceViewFooterProps = {
    currentDevice?: TPLinkPlug;
};

export const DeviceViewFooter: React.FC<DeviceViewFooterProps> = (props: DeviceViewFooterProps) => (
    <div className={`${styles.footer} flex-row`}>
        <DeviceDetails currentDevice={props.currentDevice} className={'flex-row'} />
    </div>
);

DeviceViewFooter.defaultProps = {
    currentDevice: undefined,
};
