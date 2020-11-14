import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ApplicationState } from '../../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getDeviceInfo } from '../../../../redux/device-info/actions/get-device-info.action';
import { secondsToTimespan } from '../../../../utils/time-utils/time.utils';
import { TPLinkPlug } from '../../../../models/devices/tp-link-plug.dto';
import useRecursiveTimeout from '../../../../custom-hooks/use-recursive-timeout.hook';
import {
    getThisMonthPowerUsage,
    getTodaysPowerUsage,
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

type DeviceViewRouteParams = {
    id: string;
};

export const DeviceView: React.FC = () => {
    const { id } = useParams<DeviceViewRouteParams>();
    const deviceState = useSelector((appState: ApplicationState) => appState.deviceInfo);
    const devicesState = useSelector((appState: ApplicationState) => appState.devices);
    const [currentDevice, setCurrentDevice] = React.useState<TPLinkPlug>();
    const [powerToggleClicked, setPowerToggleClicked] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        if (devicesState.status === 'PENDING') {
            history.push('/');
        } else if (devicesState.status === 'OK' && devicesState.devices) {
            setCurrentDevice(devicesState.devices.find((dev) => dev.id === id));
        }
    }, [devicesState, deviceState, id]);

    React.useEffect(() => {
        if (deviceState.status === 'PENDING' || (deviceState.status === 'OK' && deviceState.device?.id !== id)) {
            dispatch(getDeviceInfo(id));
        }
    }, [deviceState, id]);

    const pollCallback = React.useCallback(() => {
        if (deviceState.syncActive) {
            dispatch(getDeviceInfo(id));
        }
    }, [id, deviceState.syncActive]);

    const handlePowerToggleClicked = () => {
        if (deviceState.device?.isActive) {
            setPowerToggleClicked(true);
        } else {
            handlePowerToggleModalAccept();
        }
    };

    const handlePowerToggleModalAccept = () => {
        dispatch(toggleDevicePowerState(deviceState.device!.id, !deviceState.device!.isActive));
        dispatch(getDeviceInfo(id));
        setPowerToggleClicked(false);
    };

    useRecursiveTimeout(pollCallback, 3000);

    return (
        <div className="flex-col">
            <h1 className="flex-center">{currentDevice?.alias}</h1>
            <div className="flex-row flex-wrap">
                <div className={styles.realtime}>
                    <GaugeCard
                        id="power-gauge"
                        percent={deviceState.device?.power! / 3000}
                        leftString={`${transformMilliValueToFixed(deviceState.device?.realTime.currentMa!)} A`}
                        topString={transformRealtimePower(deviceState.device?.realTime.power!)}
                        rightString={`${deviceState.device?.realTime.voltage!.toFixed(0)} V`}
                        label="Realtime Usage"
                    />
                    <TimeLineChart
                        currentValue={deviceState.device?.realTime.power || 0}
                        syncActive={deviceState.syncActive}
                        height={200}
                        width={600}
                    />
                </div>
                <DeviceToggle
                    isActive={deviceState.device?.isActive!}
                    handlePowerToggleClicked={handlePowerToggleClicked}
                />
                <TextCard
                    headline={deviceState.device?.uptime ? secondsToTimespan(deviceState.device?.uptime) : '-'}
                    subtitle="uptime"
                />
                <TextCard
                    headline={
                        deviceState.device?.dailyUsage ? getTodaysPowerUsage(deviceState.device?.dailyUsage) : '-'
                    }
                    subtitle="Total today"
                />
                <TextCard
                    headline={
                        deviceState.device?.dailyUsage ? getThisMonthPowerUsage(deviceState.device?.dailyUsage) : '-'
                    }
                    subtitle="Total this month"
                />
            </div>
            <PowerOffModal
                showModal={powerToggleClicked}
                deviceAlias={currentDevice?.alias!}
                handlePowerToggleModalAccept={handlePowerToggleModalAccept}
                handlePowerToggleModalDeclineClicked={() => setPowerToggleClicked(false)}
            />
        </div>
    );
};
