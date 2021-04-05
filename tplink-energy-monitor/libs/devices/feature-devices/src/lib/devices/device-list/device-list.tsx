import * as React from 'react';
import { useDevices } from '@tplink-energy-monitor/data-access-devices';
import { mapToNavBarItem, NavButton } from '@tplink-energy-monitor/ui-shared';

import styles from './device-list.module.scss';

export const DeviceList: React.FC = () => {
  const { allDevices } = useDevices();
  return (
    <div className={`${styles.deviceList} flex-row`}>
      <div className="flex-col">
        <h2>Devices</h2>
        {allDevices.map(device => {
          const mappedDevice = mapToNavBarItem(device);
          return (<NavButton
            className={styles.deviceListLink}
            linkText={mappedDevice.linkText}
            icon={mappedDevice.icon}
            url={mappedDevice.url}
            isActive={mappedDevice.isActive}
          />);
        })
      }
      </div>
    </div>
  );
}
