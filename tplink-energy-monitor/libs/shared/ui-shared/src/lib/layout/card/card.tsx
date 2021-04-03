import * as React from 'react';
import { PropsWithChildren } from 'react';
import styles from './card.module.scss';
import cn from 'classnames';

type CardProps = {
    className?: string;
    type: 'power-card' | 'gauge-card' | 'chart-card';
};

export const Card: React.FC<PropsWithChildren<CardProps>> = (props: PropsWithChildren<CardProps>) => (
    <div
        className={cn({
            [`${styles.powerCard}`]: props.type === 'power-card',
            [`${styles.gaugeCard}`]: props.type === 'gauge-card',
            [`${styles.chartCard}`]: props.type === 'chart-card',
            'flex-row flex-center': true,
            [`${props.className}`]: !!props.className,
            [`${styles.card}`]: true,
        })}
    >
        {props.children}
    </div>
);
