import { Action } from 'redux';

export type AppAction<T, S> = {
    payload: S;
} & Action<T>;
