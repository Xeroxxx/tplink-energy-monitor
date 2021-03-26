import io from 'socket.io-client';

export type SocketEventNames = 'connection' | 'device-info' | 'device-info2' | 'discover' | 'stop-device-info';

export class SocketConnection {
    private static instance: SocketConnection;

    private readonly socket;

    private readonly reconnectInterval;

    private constructor() {
        this.socket = io.io();

        this.reconnectInterval = setInterval(this.tryReconnect, 2000);

        this.socket.on('connect', () => clearInterval(this.reconnectInterval));
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new SocketConnection();
        }

        return this.instance;
    }

    public on(event: SocketEventNames, handler: (...args: any[]) => void): void {
        if (this.socket) {
            this.socket.on(event, (...args: any[]) => {
                handler(...args);
            });
        }
    }

    public emit(event: SocketEventNames, ...args: any[]): void {
        if (this.socket) {
            this.socket.emit(event, ...args);
        }
    }

    private tryReconnect(): void {
        // @ts-ignore
        if (!this.socket.connected && !this.socket.connecting) {
            this.socket.connect();
        }
    }
}
