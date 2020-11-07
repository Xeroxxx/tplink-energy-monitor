import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../redux/store';
import { getAllDevices } from '../../../redux/devices/actions/get-devices.action';

export const Dashboard: React.FC = () => {
    const deviceState = useSelector((appState: ApplicationState) => appState.devices);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (deviceState.status === 'PENDING') {
            dispatch(getAllDevices());
        }
    }, []);

    return (
        <>
            {deviceState.status === 'OK' && <div>Device[0]: {deviceState.devices[0].alias}</div>}
            {deviceState.status === 'LOADING' && <div>LOADING...</div>}
        </>
    );
};
