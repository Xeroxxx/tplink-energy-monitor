import { TPLinkPlug, TpLinkPlugInfoDto } from '@tplink-energy-monitor/data-access-devices';
import { useDispatch } from 'react-redux';
import * as React from 'react';
import { resetDeviceView } from '../../redux/device-info/actions/reset-device.view.action';
import { setSyncActive } from '../../redux/device-info/actions/set-sync-status.action';

export const useDeviceSync = (
    id: string,
    syncActive: boolean,
    currentDevice?: TPLinkPlug & TpLinkPlugInfoDto,
): void => {
    const dispatch = useDispatch();

    const getDeviceInfo = React.useCallback(() => {
        dispatch(resetDeviceView());
        if (id !== currentDevice?.id) {
            if (currentDevice) {
                dispatch(setSyncActive(false));
            }
            dispatch(setSyncActive(true, id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, syncActive]);

    React.useEffect(() => {
        getDeviceInfo();

        return () => {
            dispatch(setSyncActive(false));
        };
    }, [id, dispatch, getDeviceInfo]);

    React.useEffect(
        () => () => {
            dispatch(setSyncActive(false));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
};
