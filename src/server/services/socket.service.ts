import { Server, Socket } from 'socket.io';
import { Logger } from '@overnightjs/logger';
import DevicesService from './devices.service';
import { Service } from 'typedi';
import * as http from 'http';

type SocketEventNames = 'connection' | 'device-info' | 'discover';

@Service()
export default class SocketConnection {
    private readonly ioSocket: Server;

    private readonly UPDATE_INTERVAL = 1000;

    constructor(private deviceService: DevicesService) {
        this.ioSocket = new Server();
    }

    public startServer(server: http.Server): void {
        Logger.Info('Initializing socket connection');

        this.ioSocket.listen(server);
        this.ioSocket.on('connection', (socket: Socket) => {
            socket.emit('discover', this.deviceService.getAll());

            let interval: NodeJS.Timeout;

            let currentId = '';

            socket.on('device-info', async (id: string) => {
                if (currentId && currentId !== id) {
                    socket.emit('device-info', await this.deviceService.getDeviceById(currentId));
                    Logger.Info(`Starting device info: ${id}`);
                    clearInterval(interval);
                    interval = setInterval(
                        async () => socket.emit('device-info', await this.deviceService.getDeviceById(currentId)),
                        this.UPDATE_INTERVAL,
                    );
                }
                currentId = id;
            });

            socket.on('stop-device-info', (id: string) => {
                if (currentId === id) {
                    Logger.Info(`Stopping device info: ${id}`);
                    clearInterval(interval);
                }
            });
        });
        Logger.Info('Socket connection initialized');
    }

    public onAny(event: SocketEventNames, dataFn: () => void): void {
        this.ioSocket.sockets.on(event, () => {
            this.ioSocket.sockets.emit(event, dataFn());
        });
    }
}
