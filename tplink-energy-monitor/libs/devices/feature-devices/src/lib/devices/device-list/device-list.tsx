import * as React from 'react';
import { useDevices } from '@tplink-energy-monitor/data-access-devices';
import {mapToNavBarItem, NavigationCard} from '@tplink-energy-monitor/ui-shared';

import styles from './device-list.module.scss';


export const DeviceList: React.FC = () => {
  const { allDevices } = useDevices();
  return (
    <div className={`${styles.deviceList}`}>
      <div>
        <h2>Select a device</h2>
        <div className="flex-row flex-center flex-wrap">
        {allDevices.map(device => {
          const mappedDevice = mapToNavBarItem(device);
          return <NavigationCard key={device.id} link={mappedDevice.url} subHeadline={mappedDevice.linkText} />;
        })
      }
        </div>
      </div>
    </div>
  );
}
