import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import styles from './sync-status.module.scss';

type SyncStatusProps = {
    syncActive: boolean;
    onSyncClick: () => void;
};

export const SyncStatus: React.FC<SyncStatusProps> = (props: SyncStatusProps) => (
    <div className={`${styles.syncStatus} flex-col flex-center`} onClick={props.onSyncClick}>
        <FontAwesomeIcon
            className={`${props.syncActive ? styles.active : styles.inActive} ${styles.syncIcon}`}
            icon={faSync}
        />
        <small className={styles.syncText}>Sync {props.syncActive ? 'active' : 'inactive'}</small>
    </div>
);
