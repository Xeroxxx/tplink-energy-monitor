import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { ApplicationState } from '../store';

export type ReduxThunkDispatch = ThunkDispatch<ApplicationState, unknown, Action>;
