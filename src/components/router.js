import React from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * A geneic component for rendering all the Route components.
 * <Switch> Renders the first child <Route> or <Redirect> that matches the location.
 */

export const Router = (props) => (
    <Switch>
        {
            props.routes.map((route, index) => {
                return (<Route exact path={route.path} component={route.component} key={index}/>);
            }) 
        }
    </Switch>
);
