import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { secondsToTimespan } from '../../../../utils/time-utils/time.utils';
import {
    getDailyAverage,
    getMonthlyAverage,
    getRealtimeAmperage,
    getThisMonthPowerUsage,
    getTodaysPowerUsage,
    getTotalLast12Month,
    getTotalLast30Days,
    transformMilliValueToFixed,
    transformRealtimePower,
} from '../../../../utils/power-utils/power.utils';
import { toggleDevicePowerState } from '../../../../redux/device-info/actions/toogle-device-power-state.action';
import { DeviceToggle } from './components/device-toggle/device-toggle';
import { TextCard } from '../../../common/layout/card/text-card/text-card';
import { PowerOffModal } from './components/power-off-modal/power-off-modal';
import { GaugeCard } from '../../../common/layout/card/gauge-chart/gauge-card';
import styles from './device-view.module.scss';
import { TimeLineChart } from '../../../common/layout/line-chart/time-line-chart';
import { BarChart } from '../../../common/layout/bar-chart/bar-chart';
import {
    mapDeviceEnergyOverviewToCharLabels,
    mapDeviceEnergyOverviewToChartData,
    mapDeviceMonthlyEnergyOverviewToCharLabels,
    mapDeviceMonthlyEnergyOverviewToChartData,
} from '../../../../models/mapper/map-device-energy-overview-to-chart-data.mapper';
import { LoadingSpinner } from '../../../common/layout/loading-spinner/loading-spinner';
import { useDevices } from '../../../../custom-hooks/device-view/use-devices.hook';
import { ModalView } from '../../../common/layout/modal/modal';
import { useDeviceSync } from '../../../../custom-hooks/device-view/use-device-sync.hook';

type DeviceViewRouteParams = {
    id: string;
};

export const DeviceView: React.FC = () => {
    const { id } = useParams<DeviceViewRouteParams>();
    const { currentDevice, isDeviceActive, syncActive, loading } = useDevices(id);

    useDeviceSync(id, syncActive, currentDevice);

    const [powerToggleClicked, setPowerToggleClicked] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handlePowerToggleClicked = React.useCallback(() => {
        if (isDeviceActive) {
            setPowerToggleClicked(true);
        } else {
            handlePowerToggleModalAccept();
        }
    }, [isDeviceActive, powerToggleClicked, currentDevice]);

    const handlePowerToggleModalAccept = React.useCallback(() => {
        dispatch(toggleDevicePowerState(currentDevice!.id!, !isDeviceActive));
        setPowerToggleClicked(false);
    }, [currentDevice, isDeviceActive, powerToggleClicked]);

    React.useEffect(() => {
        if ((!loading && currentDevice)) {
            setError(false);
        }
    }, [loading, currentDevice]);

    React.useEffect(() => {
        if (error) {
            history.push('/');
        }
    }, [error]);

    return (
        <>
            {((loading || !currentDevice) && !error) && (
                <ModalView
                    hideBackground
                    show={loading}
                    onCloseRequest={() => setError(true)}
                >
                    <LoadingSpinner />
                </ModalView>
            )}
            {(!loading && currentDevice) && (
                <>
                    <div className={`flex-col ${styles.deviceView}`}>
                        <h1 className="flex-center">{currentDevice?.alias}</h1>
                        <div className="flex-row flex-wrap">
                            <div className={styles.realtime}>
                                <div>
                                    <GaugeCard
                                        id="power-gauge"
                                        percent={currentDevice!.realTime.power / 3000}
                                        leftString={`${transformMilliValueToFixed(
                                            currentDevice!.realTime.currentMa!,
                                        )} A`}
                                        topString={transformRealtimePower(currentDevice!.realTime.power!)}
                                        rightString={`${currentDevice!.realTime.voltage!.toFixed(0)} V`}
                                        label="Realtime Usage"
                                    />
                                </div>
                                <TimeLineChart
                                    currentValue={currentDevice!.realTime.power || 0}
                                    syncActive={syncActive}
                                    height={200}
                                    width={672}
                                    title="Realtime Power (W)"
                                />
                                <TimeLineChart
                                    currentValue={getRealtimeAmperage(currentDevice!.realTime.currentMa)}
                                    syncActive={syncActive}
                                    height={200}
                                    width={672}
                                    title="Realtime Amperage (A)"
                                />
                            </div>
                            <DeviceToggle
                                isActive={isDeviceActive}
                                handlePowerToggleClicked={handlePowerToggleClicked}
                            />
                            <TextCard
                                headline={
                                   currentDevice!.uptime ? secondsToTimespan(currentDevice!.uptime) : '-'
                                }
                                subtitle="uptime"
                            />
                            <TextCard
                                headline={
                                    currentDevice!.dailyUsage
                                        ? getTodaysPowerUsage(currentDevice!.dailyUsage)
                                        : '-'
                                }
                                subtitle="Total today"
                            />
                            <TextCard
                                headline={
                                    currentDevice?.last30Days
                                        ? `${getDailyAverage(currentDevice!.last30Days)} kWh`
                                        : '-'
                                }
                                subtitle="Daily average"
                            />
                            <TextCard
                                headline={
                                    currentDevice!.dailyUsage
                                        ? getThisMonthPowerUsage(currentDevice!.dailyUsage)
                                        : '-'
                                }
                                subtitle="Total this month"
                            />
                            <TextCard
                                headline={
                                    currentDevice!.last12Month
                                        ? `${getMonthlyAverage(currentDevice!.last12Month)} kWh`
                                        : '-'
                                }
                                subtitle="Monthly average"
                            />
                        </div>
                        <div className="flex-row">
                            <BarChart
                                width={672}
                                height={200}
                                data={mapDeviceEnergyOverviewToChartData(currentDevice?.last30Days!)}
                                labels={mapDeviceEnergyOverviewToCharLabels(currentDevice?.last30Days!)}
                                title="Energy (kWh)"
                                cardLabel={`Last 30 days total ${getTotalLast30Days(currentDevice?.last30Days!)}`}
                            />
                            <BarChart
                                width={672}
                                height={200}
                                data={mapDeviceMonthlyEnergyOverviewToChartData(currentDevice?.last12Month!)}
                                labels={mapDeviceMonthlyEnergyOverviewToCharLabels(currentDevice?.last12Month!)}
                                title="Energy (kWh)"
                                cardLabel={`Last 12 month total ${getTotalLast12Month(currentDevice?.last12Month!)}`}
                            />
                        </div>
                        <PowerOffModal
                            showModal={powerToggleClicked}
                            deviceAlias={currentDevice?.alias!}
                            handlePowerToggleModalAccept={handlePowerToggleModalAccept}
                            handlePowerToggleModalDeclineClicked={() => setPowerToggleClicked(false)}
                        />
                    </div>
                </>
            )}
        </>
    );
};
