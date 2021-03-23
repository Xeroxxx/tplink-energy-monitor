import { SocketConnection } from './utils/socket-utils/socket-connection.util';
import { ReduxThunkDispatch } from './redux/types/thunk-dispatch.type';
import { updateAllDevices } from './redux/devices/actions/update-all-devices.action';
import { TPLinkPlug } from '../../../api-server/src/app/models/devices/tp-link-plug.dto';
import { TpLinkPlugInfoDto } from './models/devices/tp-link-plug-info.dto';
import { updateDeviceInfo } from './redux/device-info/actions/update-device.action';

export const initApplication = (dispatch: ReduxThunkDispatch) => {
    const socket = SocketConnection.getInstance();

    socket.on('discover', (devices: TPLinkPlug[]) => dispatch(updateAllDevices(devices)));
    socket.on('device-info', (tpLinkInfo: TpLinkPlugInfoDto) => dispatch(updateDeviceInfo(tpLinkInfo)));
};
