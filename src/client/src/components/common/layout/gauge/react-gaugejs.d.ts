import * as React from 'react';

declare module 'react-gaugejs' {
    type GaugeOptions = {
        angle: number;
        lineWidth: number;
        radiusScale: number;
        pointer: {
            length: number;
            strokeWidth: number;
            color: string;
        };
    };
    export type GaugeProps = {
        maxValue: number;
        minValue: number;
        animationSpeed: number;
        options: GaugeOptions;
        donut: boolean;
        value: number;
        textChangeHandler: (text: string) => void;
    };

    export function Gauge(props: GaugeProps): React.FC<GaugeProps>;
}
