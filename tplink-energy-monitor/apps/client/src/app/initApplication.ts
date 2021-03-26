import { SocketConnection } from './utils/socket-utils/socket-connection.util';
import { ReduxThunkDispatch } from './redux/types/thunk-dispatch.type';
import { updateAllDevices } from './redux/devices/actions/update-all-devices.action';
import { TPLinkPlug, TpLinkPlugInfoDto } from '@tplink-energy-monitor/data-access-devices';
import { updateDeviceInfo } from './redux/device-info/actions/update-device.action';

export const initApplication = (dispatch: ReduxThunkDispatch) => {
    const socket = SocketConnection.getInstance();

    socket.on('discover', (devices: TPLinkPlug[]) => dispatch(updateAllDevices(devices)));
    socket.on('device-info', (tpLinkInfo: TpLinkPlugInfoDto) => dispatch(updateDeviceInfo(tpLinkInfo)));
};
