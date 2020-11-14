import * as React from 'react';
import styles from './device-view-footer.module.scss';

type DeviceViewFooterProps = {
    deviceName: string;
    modelName: string;
    swVersion: string;
    hwVersion: string;
    hostIP: string;
};

export const DeviceViewFooter: React.FC<DeviceViewFooterProps> = (props: DeviceViewFooterProps) => {
    return (
        <div className={`${styles.footer} flex-row`}>
            <div>
                <span className={styles.label}>Device name:</span>
                <span className={styles.value}>{props.deviceName}</span>
            </div>
            <div>
                <span className={styles.label}>Model:</span>
                <span className={styles.value}>{props.modelName}</span>
            </div>
            <div>
                <span className={styles.label}>SW version:</span>
                <span className={styles.value}>{props.swVersion}</span>
            </div>
            <div>
                <span className={styles.label}>HW version:</span>
                <span className={styles.value}>{props.hwVersion}</span>
            </div>
            <div>
                <span className={styles.label}>IP:</span>
                <span className={styles.value}>{props.hostIP}</span>
            </div>
        </div>
    );
};
