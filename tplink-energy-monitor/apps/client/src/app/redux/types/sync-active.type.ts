import { ApplicationState } from '../store';
import { SocketEventNames } from '../../utils/socket-utils/socket-connection.util';
import { ReduxThunkDispatch } from './thunk-dispatch.type';

export type SetSyncActiveActionCreatorFunc = (dispatch: ReduxThunkDispatch, getState: () => ApplicationState) => void;

export type SyncActiveFuncs = {
    [key in 'start' | 'stop']: SocketEventNames;
};
