import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../store';
import { Action } from 'redux';
import { SocketEventNames } from '../../utils/socket-utils/socket-connection.util';

export type SetSyncActiveActionCreatorFunc =
    (dispatch: ThunkDispatch<ApplicationState, any, Action>, getState: () => ApplicationState) => void;

export type SyncActiveFuncs = {
    [key in 'start' | 'stop']: SocketEventNames;
}
