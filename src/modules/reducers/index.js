import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {reducer as notifications} from 'react-notification-system-redux';
import home from './home';

/**
 * As our app grows more complex, we will feel the necessity to split our 
 * reducing function into separate functions, each managing independent parts of the state.
 * 
 * The combineReducers helper function turns an object whose values are different 
 * reducing functions into a single reducing function we can pass to createStore function.
 * 
 * The connected-react-router is a redux binding for react router v4.
 * It synchronizes the router state with redux store through
 * uni-directional flow (i.e. history -> store -> router -> components).
 *
 */

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    notifications,
    home,
});

export default rootReducer;