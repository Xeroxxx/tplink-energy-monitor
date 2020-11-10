import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ApplicationState } from '../../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getDeviceInfo } from '../../../../redux/device-info/actions/get-device-info.action';
import styles from './device-view.module.scss';
import { Card } from '../../../common/layout/card/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { secondsToTimespan } from '../../../../utils/time-utils/time.utils';
import { TPLinkPlug } from '../../../../models/devices/tp-link-plug.dto';
import useRecursiveTimeout from '../../../../custom-hooks/use-recursive-timeout.hook';
import { getThisMonthPowerUsage, getTodaysPowerUsage } from '../../../../utils/power-utils/power.utils';
import { ModalView } from '../../../common/layout/modal/modal';
import { Button } from '../../../common/controls/button/button';
import { toggleDevicePowerState } from '../../../../redux/device-info/actions/toogle-device-power-state.action';

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
                <Card className={styles.powerCard}>
                    <div className="flex-col">
                        <h1 className={deviceState.device?.isActive ? styles.powerOn : styles.powerOff}>
                            <FontAwesomeIcon icon={faPowerOff} onClick={handlePowerToggleClicked} />
                        </h1>
                        <small>{deviceState.device?.isActive ? 'on' : 'off'}</small>
                    </div>
                </Card>
                <Card className={styles.powerCard}>
                    <div className="flex-col">
                        <h1>{deviceState.device?.uptime ? secondsToTimespan(deviceState.device?.uptime) : '-'}</h1>
                        <small className="flex-center">uptime</small>
                    </div>
                </Card>
                <Card className={styles.powerCard}>
                    <div className="flex-col">
                        <h1>
                            {deviceState.device?.dailyUsage ? getTodaysPowerUsage(deviceState.device?.dailyUsage) : '-'}
                        </h1>
                        <small className="flex-center">Total today</small>
                    </div>
                </Card>
                <Card className={styles.powerCard}>
                    <div className="flex-col">
                        <h1>
                            {deviceState.device?.dailyUsage
                                ? getThisMonthPowerUsage(deviceState.device?.dailyUsage)
                                : '-'}
                        </h1>
                        <small className="flex-center">Total this month</small>
                    </div>
                </Card>
            </div>
            <ModalView show={powerToggleClicked}>
                <div className={`${styles.powerOffHeadline} flex-col`}>
                    <h2>Power off</h2>
                    <div className={styles.powerOffText}>
                        Are you sure that you want to power off &apos;{currentDevice?.alias}&apos; ?
                    </div>
                    <div className="flex-end">
                        <div className={styles.powerOffAcceptButton}>
                            <Button
                                buttonStyle="primary"
                                buttonLabel="Accept"
                                type="button"
                                onClick={handlePowerToggleModalAccept}
                            />
                        </div>
                        <Button
                            buttonStyle="secondary"
                            buttonLabel="Decline"
                            type="button"
                            onClick={() => setPowerToggleClicked(false)}
                        />
                    </div>
                </div>
            </ModalView>
        </div>
    );
};
