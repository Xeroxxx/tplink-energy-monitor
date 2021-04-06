import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Controller } from '@overnightjs/core/lib/decorators/types';
import { Request, Response } from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as controllers from './api';
import { errorHandler } from './middleware/error.middleware';
import { Service } from 'typedi';
import SocketService from './services/socket.service';
import * as http from 'http';

type TpLinkController = { [key: string]: Controller };

const appControllers = { ...controllers } as TpLinkController;

@Service()
class TpLinkServer extends Server {
    private readonly SERVER_START_MSG = 'TP-Link server started on port: ';

    private readonly SERVER_CLOSE_MSG = 'CLosing TP-Link server';

    private readonly SERVER_CLOSE_NO_SERVER_MSG = 'TP-Link server was not started';

    private readonly DEV_MSG = 'Express Server is running in development mode.';

    private server?: http.Server = undefined;

    constructor(private socketService: SocketService) {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(errorHandler);
        this.app.use(morgan('combined'));
        this.setupControllers();

        if (process.env.NODE_ENV !== 'production') {
            Logger.Info('Starting server in development mode');
            const msg = this.DEV_MSG;
            this.app.get('*', (_req, res) => res.send(msg));
        } else {
            this.serveFrontend();
        }
    }

    private setupControllers(): void {
        const collectedControllers: Controller[] = [];
        Object.keys(controllers).map((controllerKey) => {
            const Cont = appControllers[controllerKey];
            return collectedControllers.push(new Cont());
        });

        super.addControllers(collectedControllers);
    }

    private serveFrontend(): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { appRoot } = global as any;
        const dir = path.join(appRoot, 'client/');

        this.app.set('views', dir);
        this.app.use(express.static(dir));

        this.app.get('*', (_req: Request, res: Response) => {
            res.sendFile('index.html', { root: dir });
        });
    }

    public start(port: string): void {
        this.server = this.app.listen(port, () => {
            Logger.Imp(this.SERVER_START_MSG + port);
        });

        this.socketService.startServer(this.server);
    }

    public close(): void {
      process.exitCode = 0;

      if (!this.server) {
        Logger.Imp(this.SERVER_CLOSE_NO_SERVER_MSG);
        process.exitCode = 1;
      }

      if (this.server){
        Logger.Imp(this.SERVER_CLOSE_MSG);
        this.server.close(err => {
          Logger.Imp(err);
          process.exitCode = 2;
        });
      }

      process.exit();
    }
}

export default TpLinkServer;
