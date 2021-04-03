import { HttpFetchError } from '../../../../../apps/client/src/app/types/http-fetch-error.class';

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

export const put = async <T, R = T>(url: string, data: T, customHeaders: CustomHeader = {}): Promise<R> => {
    const options = {
        method: 'PUT',
        headers: {
            ...customHeaders,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new HttpFetchError(response.statusText, response.status);
    }

    return response.json();
};
