export class HttpFetchError extends Error {
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'HttpFetchError';
        this.status = status;
    }
}
