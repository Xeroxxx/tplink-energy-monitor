import { SocketConnection } from '@tplink-energy-monitor/shared/utils-shared';
import { ReduxThunkDispatch } from '@tplink-energy-monitor/client/store';
import {TPLinkPlug, TpLinkPlugInfoDto, updateDeviceInfo} from '@tplink-energy-monitor/data-access-devices';
import { updateAllDevices } from "@tplink-energy-monitor/data-access-devices";

export const initApplication = (dispatch: ReduxThunkDispatch): void => {
    const socket = SocketConnection.getInstance();

    socket.on('discover', (devices: TPLinkPlug[]) => dispatch(updateAllDevices(devices)));
    socket.on('device-info', (tpLinkInfo: TpLinkPlugInfoDto) => dispatch(updateDeviceInfo(tpLinkInfo)));
};
