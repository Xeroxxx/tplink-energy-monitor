import * as React from 'react';
import { PropsWithChildren } from 'react';
import styles from './card.module.scss';

type CardProps = {
    className?: string;
};

export const Card: React.FC<PropsWithChildren<CardProps>> = (props: PropsWithChildren<CardProps>) => {
    return <div className={`${styles.card} flex-row flex-center ${props.className}`}>{props.children}</div>;
};
