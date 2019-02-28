import React from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import { connect } from "react-redux";
import Notifications from 'react-notification-system-redux';
import PropTypes from 'prop-types';
import Home from "../home";
import NotFound from "../404";

class App extends React.Component {

    render(){

        const { notifications } = this.props;

        return [
            <Switch key={1}>
                <Route exact path="/" component={Home}/>
                <Route exact path="*" component={NotFound}/>
            </Switch>, 
            <Notifications
                key={2}
                notifications={notifications}
            />
        ];
    }
}

App.propTypes = {
    notifications: PropTypes.array
};

const mapStateToProps = state => ({
    notifications: state.notifications
});

export default App = withRouter(connect(mapStateToProps)(App));