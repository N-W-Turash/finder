import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { Loading } from '../../components';

const AsyncPage = loadable(
	props => pMinDelay(import(`../${props.page}`), 1000),
	{
		fallback: <Loading paddingTop={60} />
	}
);

const App = () => {
	return (
		<Router>
			<Switch>
				<Route
					exact
					path={'/'}
					component={() => <AsyncPage page={'home'} />}
				/>
				<Route
					exact
					path={'/venue/:id'}
					component={() => (
						<AsyncPage page={'searchedVenueDetails'} />
					)}
				/>
				<Route
					exact
					path={'*'}
					component={() => <AsyncPage page={'404'} />}
				/>
			</Switch>
		</Router>
	);
};

export default App;
