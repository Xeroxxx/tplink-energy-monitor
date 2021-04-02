import * as React from 'react';
import styles from '../card.module.scss';
import { Card } from '../card';

type TextCardProps = {
    headline: string;
    subtitle: string;
};

export const TextCard: React.FC<TextCardProps> = (props: TextCardProps) => (
    <Card type="power-card">
        <div className="flex-col">
            <h1 className={styles.cardHeadline}>{props.headline}</h1>
            <small className="flex-center">{props.subtitle}</small>
        </div>
    </Card>
);
