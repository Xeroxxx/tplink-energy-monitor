import { Service } from 'typedi';
import { getAllDevices } from '../utils/tp-link-api.util';
import { Plug } from 'tplink-smarthome-api';
import { AnyDevice } from 'tplink-smarthome-api/lib/client';
import { TpLinkDeviceTypes } from '../types/devices/device-type.enum';
import { Logger } from '@overnightjs/logger';
import { FullTPLinkPlug, TPLinkPlug } from '../models/devices/tp-link-plug.dto';
import { mapFullTPLinkPlugToTPLinkPlug, mapToFullTPLinkPlug } from '../models/mapper/map-to-tp-link-plug.mapper';

@Service()
export default class DevicesService {
    private devices: FullTPLinkPlug[] = [];

    public discoverAll(): void {
        getAllDevices(this.AddToDevices.bind(this));
    }

    public getAll(): TPLinkPlug[] {
        Logger.Info('Getting all current devices.');
        return this.devices.map((device: FullTPLinkPlug) => mapFullTPLinkPlugToTPLinkPlug(device));
    }

    public getDeviceById(id: string): TPLinkPlug {
        const plug = this.devices.find((device) => device.id === id);

        if (!plug) {
            throw new Error('Invalid Id');
        }

        return mapFullTPLinkPlugToTPLinkPlug(plug);
    }

    private async AddToDevices(device: AnyDevice): Promise<void> {
        if (device.type === TpLinkDeviceTypes.SMARTPLUGSWITCH) {
            const plug = device as Plug;
            const info = await plug.getSysInfo();

            this.devices.push(mapToFullTPLinkPlug(plug, info));
            Logger.Info(`Discovered device: ${plug.id} with alias: ${plug.alias}`);
        }
    }
}
