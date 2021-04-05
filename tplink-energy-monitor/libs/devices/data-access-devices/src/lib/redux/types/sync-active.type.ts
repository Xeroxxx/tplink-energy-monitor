import { SocketEventNames } from '@tplink-energy-monitor/shared/utils-shared';
// eslint-disable-next-line
import { ApplicationState, ReduxThunkDispatch } from '@tplink-energy-monitor/client/store-types';

export type SetSyncActiveActionCreatorFunc = (dispatch: ReduxThunkDispatch, getState: () => ApplicationState) => void;

export type SyncActiveFuncs = {
    [key in 'start' | 'stop']: SocketEventNames;
};
