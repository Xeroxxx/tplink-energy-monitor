import * as React from 'react';
import { Card } from '../card';
import { GaugeComponent } from '../../gauge/gauge';

type GaugeCardProps = {
    id: string;
    className?: string;
    leftString?: string;
    topString?: string;
    rightString?: string;
    label?: string;
};

export const GaugeCard: React.FC<GaugeCardProps> = (props: GaugeCardProps) => {
    return (
        <Card type="gauge-card">
            <div className="flex-col">
                <GaugeComponent
                    id={props.id}
                    className={props.className}
                    leftString={props.leftString}
                    topString={props.topString}
                    rightString={props.rightString}
                    label={props.label}
                />
            </div>
        </Card>
    );
};

GaugeCard.defaultProps = {
    className: '',
    leftString: '',
    topString: '',
    rightString: '',
    label: '',
};
