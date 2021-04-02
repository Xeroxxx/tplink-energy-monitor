import { Service } from 'typedi';
import {
    getAllDevices,
    getDailyDeviceUsage,
    getLast12MonthUsage,
    getLast30DaysUsage,
    getRealtimeData,
    setPowerState,
} from '../utils/tp-link-api.util';
import { Plug } from 'tplink-smarthome-api';
import { AnyDevice } from 'tplink-smarthome-api/lib/client';
import { Logger } from '@overnightjs/logger';
import {
    TpLinkDeviceTypes,
    FullTPLinkPlug,
    TPLinkPlug,
    ChangePowerStateDto,
    DeviceEnergyOverview,
    TpLinkPlugInfoDto,
} from '@tplink-energy-monitor/data-access-devices';
import { mapFullTPLinkPlugToTPLinkPlug, mapToFullTPLinkPlug } from '../models/mapper/map-to-tp-link-plug.mapper';
import { mapSysinfoToTPLinkPlugInfo } from '../models/mapper/map-sysinfo-to-tp-link-plug-info.mapper';

@Service()
export default class DevicesService {
    private devices: FullTPLinkPlug[] = [];

    constructor() {
        this.discoverAll();
    }

    public getAll(): TPLinkPlug[] {
        Logger.Info('Getting all current devices.');
        return this.devices.map((device: FullTPLinkPlug) => mapFullTPLinkPlugToTPLinkPlug(device));
    }

    public async getDeviceById(id: string): Promise<TpLinkPlugInfoDto> {
        const tpDevice = this.devices.find((device) => device.id === id);

        if (!tpDevice) {
            throw new Error('Invalid Id');
        }

        const plug: Plug = tpDevice.deviceHandle;
        const dailyUsage: DeviceEnergyOverview = await getDailyDeviceUsage(tpDevice);

        const realtimeData = await getRealtimeData(tpDevice);

        return plug
            .getInfo()
            .then((info) =>
                mapSysinfoToTPLinkPlugInfo(
                    info,
                    Boolean(info.sysInfo.relay_state),
                    tpDevice.id,
                    dailyUsage,
                    realtimeData,
                ),
            );
    }

    public async setPowerState(id: string, changePowerStateDto: ChangePowerStateDto): Promise<void> {
        if (id !== changePowerStateDto.id) {
            throw new Error('Invalid id');
        }
        const tpDevice = this.devices.find((device) => device.id === id);

        if (!tpDevice) {
            throw new Error('Invalid Id');
        }

        await setPowerState(tpDevice, changePowerStateDto.powerState);
    }

    private async AddToDevices(device: AnyDevice): Promise<void> {
        if (device.type === TpLinkDeviceTypes.SMARTPLUGSWITCH) {
            const plug = device as Plug;
            const info = await plug.getSysInfo();
            const newDevice = mapToFullTPLinkPlug(plug, info);

            if (this.devices.find((dev) => dev.id === newDevice.id)) {
                return;
            }

            newDevice.last30Days = await getLast30DaysUsage(newDevice);
            newDevice.last12Month = await getLast12MonthUsage(newDevice);

            this.devices.push(newDevice);
            Logger.Info(`Discovered device: ${plug.id} with alias: ${plug.alias}`);
        }
    }

    private discoverAll(): void {
        getAllDevices(this.AddToDevices.bind(this));
    }
}
