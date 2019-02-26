import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './modules/store';
import * as $ from 'jquery'
import Popper  from 'popper.js'
import Tether from 'tether';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
// import 'ionicons/dist/css/ionicons.css';

import App from './containers/app';
import './index.css';

window.Tether = Tether;
window.jQuery = window.$ = $;
window.Popper = Popper;

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App />
            </div>
        </ConnectedRouter>
    </Provider>,
    target
);
