import * as React from 'react';
//import GaugeChart from 'react-gauge-chart';
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
            {props.topString && <span className={styles.topString}>{props.topString}</span>}
            {props.rightString && <span className={styles.rightString}>{props.rightString}</span>}
            {props.label && <small className={styles.label}>{props.label}</small>}
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
