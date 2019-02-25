import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';

export const history = createHistory();

const initialState = {};
const enhancers = [];

const middleware = [
    thunk,
    routerMiddleware(history),
];

// to enable the redux devtool extension in chrome browser, this should only be enbabled for dev environemnt
if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__; // in previous version it was window.devToolsExtension which have been replaced by this

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    rootReducer(history),
    initialState,
    composedEnhancers
);

export default store;