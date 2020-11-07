import { HttpFetchError } from '../types/http-fetch-error.class';

export type CustomHeader = {
    [key: string]: string;
};
export const get = async <T>(url: string, customHeaders: CustomHeader = {}): Promise<T> => {
    const options = {
        method: 'GET',
        headers: {
            ...customHeaders,
            Accept: 'application/json',
        },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new HttpFetchError(response.statusText, response.status);
    }

    return response.json();
};
