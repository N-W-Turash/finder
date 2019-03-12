import React from 'react';
import { render } from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './modules/store';
import * as $ from 'jquery'
import Popper  from 'popper.js'
import Tether from 'tether';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './containers/app';
import './css/index.css';

/**
 * As we're using bootstrap framework; we need to enable jquery, popper.js and tether.js 
 * too as they're the necessary dependencies. Here, we're specying them as globals.
 * 
 */

window.Tether = Tether;
window.jQuery = window.$ = $;
window.Popper = Popper;

/**
 * The whole app will be mounted inside the html element with having the id 'root'.
 * 
 */

const target = document.querySelector('#root');


/**
 * For providing context to the components wrapped by react-redux's connect().
 * 
 */
export const StoreContext = ReactReduxContext;

/**
 * React Redux provides <Provider />, which makes the Redux store available to the rest of the app,.
 * Wrapped react-router v4 routing with ConnectedRouter and passed the history object as a prop.
 * Placed ConnectedRouter as a child of react-redux's Provider.
 * Note: the history object provided to router reducer, routerMiddleware, 
 * and ConnectedRouter component must be the same history object.
 * 
 */

render(
    <Provider store={store} context={StoreContext}>
        <ConnectedRouter history={history} context={StoreContext}>
            <div>
                <App/>
            </div> 
        </ConnectedRouter>
    </Provider>,
    target
);
