import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { ApplicationState } from './application-state.type';

export type ReduxThunkDispatch = ThunkDispatch<ApplicationState, unknown, Action>;
