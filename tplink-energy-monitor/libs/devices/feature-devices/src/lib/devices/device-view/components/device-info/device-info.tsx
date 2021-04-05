import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalView } from '@tplink-energy-monitor/ui-shared';
import { useDevices } from '@tplink-energy-monitor/data-access-devices';
import { DeviceDetails } from '../footer/device-details';

import styles from './device-info.module.scss';

export const DeviceInfo: React.FC = () => {
    const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);
    const { currentDevice } = useDevices();
    return (
        <div className={`${styles.deviceInfo} flex-column flex-center`}>
            <FontAwesomeIcon icon={faInfoCircle} onClick={() => setShowInfoModal(true)} />
            <ModalView show={showInfoModal} onCloseRequest={() => setShowInfoModal(false)}>
                <DeviceDetails currentDevice={currentDevice} className={styles.deviceDetails} />
            </ModalView>
        </div>
    );
};
