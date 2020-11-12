import * as React from 'react';
import GaugeChart from 'react-gauge-chart';
import styles from './gauge.module.scss';

type GaugeComponentProps = {
    id: string;
    percent: number;
    className?: string;
    leftString?: string;
    topString?: string;
    rightString?: string;
    label?: string;
};

export const GaugeComponent: React.FC<GaugeComponentProps> = (props: GaugeComponentProps) => {
    return (
        <div className={styles.gauge}>
            {props.leftString && <span className={styles.leftString}>{props.leftString}</span>}
            <GaugeChart
                id={props.id}
                className={props.className}
                colors={['#5BE12C', '#F5CD19', '#EA4228']}
                textColor="#888383"
                percent={props.percent}
            />
            {props.topString && <span className={styles.topString}>{props.topString}</span>}
            {props.rightString && <span className={styles.rightString}>{props.rightString}</span>}
            {props.label && <span className={styles.label}>{props.label}</span>}
        </div>
    );
};

GaugeComponent.defaultProps = {
    className: '',
    leftString: '',
    topString: '',
    rightString: '',
    label: '',
};
