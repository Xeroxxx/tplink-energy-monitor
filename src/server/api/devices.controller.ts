import { StatusCodes } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import DevicesService from '../services/devices.service';

@Controller('api/devices')
@Service()
export default class DevicesController {
    private readonly devicesService: DevicesService;

    constructor() {
        this.devicesService = Container.get(DevicesService);
    }

    @Get('')
    private getDevices(req: Request, res: Response) {
        try {
            return res.status(StatusCodes.OK).json(this.devicesService.getAll());
        } catch (err) {
            Logger.Err(err, true);
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    }

    @Get(':id')
    private getDevice(req: Request, res: Response) {
        try {
            return res.status(StatusCodes.OK).json(this.devicesService.getDeviceById(req.params.id));
        } catch (err) {
            Logger.Err(err, true);
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    }

    @Get('discover')
    private discoverAll(req: Request, res: Response) {
        this.devicesService.discoverAll();

        return res.sendStatus(StatusCodes.OK);
    }
}
