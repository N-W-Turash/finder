import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import home from './home';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    home,
});

export default rootReducer;