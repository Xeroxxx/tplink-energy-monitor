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
    private getAll(_req: Request, res: Response) {
        try {
            return res.status(StatusCodes.OK).json(this.devicesService.getAll());
        } catch (err) {
            Logger.Err(err, true);
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
}
