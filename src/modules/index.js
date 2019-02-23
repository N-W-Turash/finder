import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
// import {reducer as notifications} from 'react-notification-system-redux';
import home from './home';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    // notifications,
    home,
});

export default rootReducer;