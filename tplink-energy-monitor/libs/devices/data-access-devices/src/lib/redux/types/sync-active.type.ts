import { ApplicationState } from '@tplink-energy-monitor/client/store';
import { SocketEventNames } from '@tplink-energy-monitor/shared/utils-shared';
import { ReduxThunkDispatch } from '@tplink-energy-monitor/client/store';

export type SetSyncActiveActionCreatorFunc = (dispatch: ReduxThunkDispatch, getState: () => ApplicationState) => void;

export type SyncActiveFuncs = {
    [key in 'start' | 'stop']: SocketEventNames;
};
