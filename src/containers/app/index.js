import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
// import Notifications from 'react-notification-system-redux';
import Home from "../home";
import NotFound from "../404";
// import { PrivateRoute } from "../../components/privateroute";
import { PublicRoute } from "../../components/publicroute";

class App extends React.Component {

    render(){

        // const { notifications } = this.props;

        return [
            <Switch key={1}>
                <PublicRoute exact path="/" component={Home}/>
                <PublicRoute exact path="*" component={NotFound}/>
            </Switch>,
            /*<Notifications
                key={2}
                notifications={notifications}
            />*/
        ];
    }
}

const mapStateToProps = state => ({
    // notifications: state.notifications
});

export default App = withRouter(connect(mapStateToProps)(App));