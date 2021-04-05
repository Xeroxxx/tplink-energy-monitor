import * as React from 'react';
import styles from './device-view-footer.module.scss';
import { TPLinkPlug } from '@tplink-energy-monitor/data-access-devices';

type DeviceDetailsProps = {
    currentDevice?: TPLinkPlug;
    className?: string;
};

export const DeviceDetails: React.FC<DeviceDetailsProps> = (props: DeviceDetailsProps) => (
    <div className={props.className}>
        <div className={styles.infoLine}>
            <span className={styles.label}>Device name:</span>
            <span className={styles.value}>{props.currentDevice?.deviceName}</span>
        </div>
        <div className={styles.infoLine}>
            <span className={styles.label}>Model:</span>
            <span className={styles.value}>{props.currentDevice?.model}</span>
        </div>
        <div className={styles.infoLine}>
            <span className={styles.label}>SW version:</span>
            <span className={styles.value}>{props.currentDevice?.swVersion}</span>
        </div>
        <div className={styles.infoLine}>
            <span className={styles.label}>HW version:</span>
            <span className={styles.value}>{props.currentDevice?.hwVersion}</span>
        </div>
        <div className={styles.infoLine}>
            <span className={styles.label}>IP:</span>
            <span className={styles.value}>{props.currentDevice?.host}</span>
        </div>
    </div>
);
