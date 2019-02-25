import React from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import { connect } from "react-redux";
import Home from "../home";
import NotFound from "../404";

class App extends React.Component {

    render(){
        return [
            <Switch key={1}>
                <Route exact path="/" component={Home}/>
                <Route exact path="*" component={NotFound}/>
            </Switch>,
        ];
    }
}

const mapStateToProps = state => ({
    // notifications: state.notifications
});

export default App = withRouter(connect(mapStateToProps)(App));