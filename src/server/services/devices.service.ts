import { Service } from 'typedi';
import { getAllDevices } from '../utils/tp-link-api.util';
import { Plug } from 'tplink-smarthome-api';
import { AnyDevice } from 'tplink-smarthome-api/lib/client';
import { TpLinkDeviceTypes } from '../types/devices/device-type.enum';
import { Logger } from '@overnightjs/logger';
import { TPLinkPlug } from '../models/devices/tp-link-plug.dto';
import { mapToTPLinkPlug } from '../models/mapper/map-to-tp-link-plug.mapper';

@Service()
export default class DevicesService {
    private devices: TPLinkPlug[] = [];

    public discoverAll(): void {
        getAllDevices(this.AddToDevices.bind(this));
    }

    public getAll(): TPLinkPlug[] {
        Logger.Info('Getting all current devices.');
        return this.devices;
    }

    private async AddToDevices(device: AnyDevice): Promise<void> {
        if (device.type === TpLinkDeviceTypes.SMARTPLUGSWITCH) {
            const plug = device as Plug;
            const info = await plug.getSysInfo();

            this.devices.push(mapToTPLinkPlug(plug, info));
            Logger.Info(`Discovered device: ${plug.id} with alias: ${plug.alias}`);
        }
    }
}
