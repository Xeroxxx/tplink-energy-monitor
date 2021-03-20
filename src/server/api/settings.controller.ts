import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
import { StatusCodes } from 'http-status-codes';
import { Container } from 'typedi';
import SettingsService from '../services/settings.service';

@Controller('api/settings')
export default class SettingsController {
    constructor(private readonly settings: SettingsService) {
        this.settings = Container.get<SettingsService>(SettingsService);
    }

    @Get('')
    private async get(_req: Request, res: Response) {
        try {
            Logger.Info('Client fetching user settings');
            return res.status(StatusCodes.OK).json(await this.settings.loadSettings());
        } catch (err) {
            Logger.Err(err, true);
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
}
