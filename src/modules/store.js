import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';

/**
 * history is a JavaScript library that lets us easily manage session history anywhere JavaScript runs.
 * createBrowserHistory is for use in modern web browsers that support the HTML5 history API.
 * 
 */
export const history = createHistory();

const initialState = {};
const enhancers = [];

/**
 * Middleware provides a way to interact with actions 
 * that have been dispatched to the store before they reach the store's reducer. 
 * 
 * Examples of different uses for middleware include 
 * logging actions, reporting errors, making asynchronous requests, and dispatching new actions.
 * 
 * We've used the redux-thunk middleware; this middleware allows us 
 * to write action creators that return a function instead of an action 
 * for handling basic redux side effects logic 
 * like simple async logic like AJAX requests.
 * 
 * We've used routerMiddleware(history) if we need to dispatch history actions 
 * (e.g. to change URL with push('/path/to/somewhere')).
 */

const middlewares = [
    thunk,
    routerMiddleware(history),
];

/**
 * To enable the redux devtool extension in chrome browser. 
 * [N.B: This should only be enbabled for dev environemnt]
 * 
 * In previous version it was window.devToolsExtension 
 * which have been replaced by window.__REDUX_DEVTOOLS_EXTENSION__.
 *
 */

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__; 
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

/**
 * As middleware is the suggested way to extend Redux with custom functionality, 
 * we need to use multiple middlewares.  
 * 
 * Here, applyMiddleware takes each piece of middleware as a new argument (not an array).
 * 
 * The compose(...functions) is used when we want to pass multiple store enhancers to the store. 
 * Store enhancers are higher order functions that add some extra functionality to the store. 
 * The only store enhancer which is supplied with Redux by default is applyMiddleware however many other are available.
 * 
 * Higher order functions can take functions as parameters and return functions as return values. 
 * A function that does either of those is called a higher order function.
 * 
 */

const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
);

/**
 * The function createStore(reducer, [preloadedState], [enhancer]) creates 
 * a Redux store that holds the complete state tree of our app.
 * 
 * A reducer (also called a reducing function) is a function that accepts an accumulation 
 * and a value and returns a new accumulation. They are used to reduce a collection 
 * of values down to a single value.
 * 
 * [preloadedState] is the initial state which must be a plain object 
 * with the same shape as the keys passed to it.
 * 
 * We've discussed about [enhancer] in the previous section.
 * 
 */
 
const store = createStore(
    rootReducer(history),
    initialState,
    composedEnhancers
);

export default store;