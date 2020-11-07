import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';

type ApplicationState = {};

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({});

export default function configureStore(history: History, initialState: ApplicationState): Store<ApplicationState> {
    const composeEnhancers = composeWithDevTools({});

    // @ts-ignore
    return createStore<ApplicationState>(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
    );
}
