import { useSelector } from 'react-redux';
import * as React from 'react';
import { TPLinkPlug, TpLinkPlugInfoDto } from '@tplink-energy-monitor/data-access-devices';
// eslint-disable-next-line
import { ApplicationState } from '@tplink-energy-monitor/client/store-types';

type DeviceInfo = {
    deviceCount: number;
    currentDevice: TPLinkPlug & TpLinkPlugInfoDto;
    isDeviceActive: boolean;
    syncActive: boolean;
    loading: boolean;
};

export const useDevices = (id?: string): DeviceInfo => {
    const [currentDevice, setCurrentDevice] = React.useState<TPLinkPlug & TpLinkPlugInfoDto>(
        {} as TPLinkPlug & TpLinkPlugInfoDto,
    );

    const deviceState = useSelector((appState: ApplicationState) => appState.deviceInfo);
    const devicesState = useSelector((appState: ApplicationState) => appState.devices);

    React.useEffect(() => {
        if (
            devicesState.status === 'OK' &&
            devicesState &&
            devicesState.devices &&
            deviceState.status === 'OK' &&
            deviceState.device
        ) {
            const deviceId = id ?? deviceState.device.id;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const device = devicesState.devices.find((dev) => dev.id === deviceId)!;
            const deviceInfo = deviceState.device;

            setCurrentDevice({
                ...device,
                ...deviceInfo,
            });
        }
    }, [devicesState, deviceState, id]);

    return {
        deviceCount: devicesState.devices.length || 0,
        currentDevice,
        isDeviceActive: currentDevice?.isActive || false,
        syncActive: deviceState.syncActive || true,
        loading:
            deviceState.status === 'LOADING' ||
            deviceState.status === 'PENDING' ||
            devicesState.status === 'LOADING' ||
            devicesState.status === 'PENDING',
    };
};
