import * as React from 'react';
import styles from './power-off-modal.module.scss';
import { Button, ModalView } from '@tplink-energy-monitor/ui-shared';

type PowerOffModalProps = {
    showModal: boolean;
    deviceAlias: string;
    handlePowerToggleModalAccept: () => void;
    handlePowerToggleModalDeclineClicked: () => void;
};

export const PowerOffModal: React.FC<PowerOffModalProps> = (props: PowerOffModalProps) => (
    <ModalView show={props.showModal}>
        <div className={`${styles.powerOffHeadline} flex-col`}>
            <h2>Power off</h2>
            <div className={styles.powerOffText}>
                Are you sure that you want to power off &apos;{props.deviceAlias}&apos; ?
            </div>
            <div className="flex-end">
                <div className={styles.powerOffAcceptButton}>
                    <Button
                        buttonStyle="secondary"
                        buttonLabel="Accept"
                        type="button"
                        onClick={props.handlePowerToggleModalAccept}
                    />
                </div>
                <Button
                    buttonStyle="primary"
                    buttonLabel="Decline"
                    type="button"
                    onClick={props.handlePowerToggleModalDeclineClicked}
                />
            </div>
        </div>
    </ModalView>
);
