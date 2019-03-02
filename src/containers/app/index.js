import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Notifications from 'react-notification-system-redux';
import PropTypes from 'prop-types';
import Home from "../home";
import NotFound from "../404";
import { Router } from "../../components";

class App extends React.Component {

    /**
     * An array of objects called 'components' is passed as a prop to the Router component.
     * Each object of the array contains the property depeicting the route path and it's 
     * corresponding component.
     * 
     */

    render() {

        /**
         * We get 'notifications' prop using the 'react-notification-system-redux' lib.
         * 
         */

        const { notifications } = this.props;

        /**
         * An array of objects called 'components' is passed as a prop to the Router component.
         * Each object of the array contains the property depeicting the route path and it's 
         * corresponding component.
         * 
         */

        const components = [
            {
                path: '/',
                component: Home,
            },
            {
                path: '*',
                component: NotFound,
            },
        ];

        return [
            <Router 
                key={1}
                routes={components}
            />, 

            /**
             * We've used 'Notifications' component from the 'react-notification-system-redux' lib.
             * 
             */

            <Notifications
                key={2}
                notifications={notifications}
            />
        ];
    }
}

/**
 * The App component will receive 'notifications' as it's prop.
 * 
 */

App.propTypes = {
    notifications: PropTypes.array
};

/**
 * The connect() function connects a React component to a Redux store.
 * If a mapStateToProps function is specified, the new wrapper component will subscribe to Redux store updates. 
 * This means that any time the store is updated, mapStateToProps will be called. 
 * The mapStateToProps functions are expected to return an object. This object, normally referred to as 
 * stateProps, will be merged as props to the connected component.
 * 
 * We can get access to the history object’s properties and the closest <Route>'s match via the withRouter 
 * higher-order component. withRouter will pass updated match, location, and history props to the 
 * wrapped component whenever it renders.
 * 
 */

const mapStateToProps = state => ({
    notifications: state.notifications
});

export default App = withRouter(connect(mapStateToProps)(App));