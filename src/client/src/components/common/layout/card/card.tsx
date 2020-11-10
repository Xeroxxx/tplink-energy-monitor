import * as React from 'react';
import { PropsWithChildren } from 'react';
import styles from './card.module.scss';

type CardProps = {
    className?: string;
    type: 'power-card';
};

export const Card: React.FC<PropsWithChildren<CardProps>> = (props: PropsWithChildren<CardProps>) => {
    return (
        <div
            className={`${props.type === 'power-card' ? styles.powerCard : ''} ${styles.card} flex-row flex-center ${
                props.className
            }`}
        >
            {props.children}
        </div>
    );
};
