import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Card } from '@tplink-energy-monitor/ui-shared';
import styles from './device-toggle.module.scss';

type DeviceToggleProps = {
    isActive: boolean;
    handlePowerToggleClicked: () => void;
};

export const DeviceToggle: React.FC<DeviceToggleProps> = (props: DeviceToggleProps) => (
    <Card type="power-card" className={styles.powerCard}>
        <div className="flex-col">
            <h1 className={props.isActive ? styles.powerOn : styles.powerOff}>
                <FontAwesomeIcon icon={faPowerOff} onClick={props.handlePowerToggleClicked} />
            </h1>
            <small>{props.isActive ? 'on' : 'off'}</small>
        </div>
    </Card>
);
