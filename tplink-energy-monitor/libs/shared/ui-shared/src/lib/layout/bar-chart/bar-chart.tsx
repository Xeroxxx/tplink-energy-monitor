import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from '../card/card';
import 'chartjs-plugin-streaming';
import styles from './bar-chart.module.scss';

type LineChartProps = {
    width: number;
    height: number;
    data: number[];
    labels: string[];
    title: string;
    cardLabel: string;
};

export const BarChart: React.FC<LineChartProps> = (props: LineChartProps) => {
    const [chartDimension, setChartDimension] = React.useState<{ width: number; height: number }>();

    const data = React.useMemo(
        () => ({
            datasets: [
                {
                    data: props.data,
                },
            ],
            labels: props.labels,
        }),
        [props],
    );

    const options = React.useMemo(
        () => ({
            title: {
                display: true,
                text: props.title,
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            maintainAspectRatio: false,
            tooltips: {
                intersect: false,
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    React.useEffect(() => {
        setChartDimension({
            width: props.width,
            height: props.height,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card type="chart-card">
            <div className="flex-col">
                {chartDimension?.width && chartDimension?.height && (
                    <Bar data={data} options={options} width={chartDimension.width} height={chartDimension.height} />
                )}
                <small className={styles.cardLabel}>{props.cardLabel}</small>
            </div>
        </Card>
    );
};
