import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from '../card/card';
import 'chartjs-plugin-streaming';

type LineChartProps = {
    currentValue: number;
    syncActive: boolean;
    width: number;
    height: number;
};

export const TimeLineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
    const [chartDimension, setChartDimension] = React.useState<{ width: number; height: number }>({
        width: 600,
        height: 200,
    });
    const rtChatOnRefresh = React.useCallback(
        (chart: any) => {
            if (props.syncActive) {
                chart.data.datasets[0].data.push({
                    x: Date.now(),
                    y: props.currentValue,
                });
            }
        },
        [props.currentValue],
    );

    const data = React.useMemo(
        () => ({
            datasets: [
                {
                    data: [],
                },
            ],
        }),
        [],
    );

    const options = React.useMemo(
        () => ({
            title: {
                display: true,
                text: 'Realtime Power (W)',
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [
                    {
                        type: 'realtime',
                        realtime: {
                            duration: 20000,
                            refresh: 1000,
                            onRefresh: rtChatOnRefresh,
                        },
                        delay: 3000,
                    },
                ],
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
        [props.currentValue],
    );

    React.useEffect(() => {
        setChartDimension({
            width: props.width,
            height: props.height,
        });
    }, []);

    return (
        <Card type="chart-card">
            <Line data={data} options={options} width={chartDimension.width} height={chartDimension.height} />
        </Card>
    );
};
