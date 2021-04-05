import * as React from 'react';
import { PropsWithChildren } from 'react';
import styles from './card.module.scss';
import cn from 'classnames';

type CardProps = {
    className?: string;
    type: 'power-card' | 'gauge-card' | 'chart-card';
    onClick?: () => void;
    flexType?: 'col' | 'row',
};

export const Card: React.FC<PropsWithChildren<CardProps>> = (props: PropsWithChildren<CardProps>) => (
    <div
        className={cn({
            [`${styles.powerCard}`]: props.type === 'power-card',
            [`${styles.gaugeCard}`]: props.type === 'gauge-card',
            [`${styles.chartCard}`]: props.type === 'chart-card',
            'flex-row flex-center': props.flexType === 'row',
            'flex-col': props.flexType === 'col',
            [`${props.className}`]: !!props.className,
            [`${styles.card}`]: true,
        })}
        onClick={props.onClick}
    >
        {props.children}
    </div>
);

Card.defaultProps = {
  flexType: 'row',
}
