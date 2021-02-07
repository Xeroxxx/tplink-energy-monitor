import * as React from 'react';
import styles from './modal.module.scss';
import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

type ModalViewProps = {
    show: boolean;
};

export const ModalView: React.FC<PropsWithChildren<ModalViewProps>> = (props: PropsWithChildren<ModalViewProps>) => {
    return props.show ? ReactDOM.createPortal(
        <div className={`${styles.backdrop} ${props.show ? styles.visible : styles.hidden}`}>
            <div className={`${styles.modalContent} flex-col`}>{props.children}</div>
        </div>,
        document.getElementById('root')!,
    ) : null;
};
