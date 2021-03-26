import HttpException from '../types/http-exception.type';
import { Response, Request, NextFunction } from 'express';
import { Logger } from '@overnightjs/logger';

export const errorHandler = (error: HttpException, request: Request, response: Response, _next: NextFunction) => {
    const status = error.statusCode || 500;
    const message = error.message || "It's not you. It's us. We are having some problems.";
    Logger.Err({ status, message });
    response.status(status).send(message);
};
