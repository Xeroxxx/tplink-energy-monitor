import * as React from 'react';
import { useParams } from 'react-router-dom';

type DeviceViewRouteParams = {
    id: string;
};

export const DeviceView: React.FC = () => {
    const { id } = useParams<DeviceViewRouteParams>();

    return <div>ID: {id}</div>;
};
