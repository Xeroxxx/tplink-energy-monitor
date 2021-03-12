import { useSelector } from 'react-redux';
import { ApplicationState } from '../redux/store';
import * as React from 'react';
import { TPLinkPlug } from '../models/devices/tp-link-plug.dto';
import { TpLinkPlugInfoDto } from '../models/devices/tp-link-plug-info.dto';

export const useDevices = (id: string) => {
    const [currentDevice, setCurrentDevice] = React.useState<TPLinkPlug & TpLinkPlugInfoDto>();

    const deviceState = useSelector((appState: ApplicationState) => appState.deviceInfo);
    const devicesState = useSelector((appState: ApplicationState) => appState.devices);

    React.useEffect(() => {
        if (devicesState.status === 'OK' && devicesState.devices && deviceState.status === 'OK' && deviceState.device) {
            const device = devicesState.devices.find((dev) => dev.id === id)!;
            const deviceInfo = deviceState.device;
            setCurrentDevice({
                ...device,
                ...deviceInfo,
            });
        }
    }, [devicesState, deviceState, id]);

    return {
        currentDevice,
        isDeviceActive: currentDevice?.isActive || false,
        syncActive: deviceState.syncActive || true,
        loading: deviceState.status === 'LOADING' || deviceState.status === 'PENDING' ||
            devicesState.status === 'LOADING' || devicesState.status === 'PENDING',
    };
};
