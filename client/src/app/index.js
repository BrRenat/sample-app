import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import asyncRoute from './asyncRoute';

import { AppContainer, AppContent } from './styles';

const MainScreen = asyncRoute(() => import(
	/* webpackChunkName: "MainScreen" */
	'containers/MainScreen'
));

const CreateUser = asyncRoute(() => import(
	/* webpackChunkName: "CreateUser" */
	'containers/CreateUser'
));

const EditUser = asyncRoute(() => import(
	/* webpackChunkName: "EditUser" */
	'containers/EditUser'
));

const AppNotifications = asyncRoute(() => import(
	/* webpackChunkName: "AppNotifications" */
	'containers/AppNotifications'
));

const App = ({ store }) => (
	<Provider store={store}>
		<HashRouter>
			<AppContainer>
				<AppContent>
					<Switch>
						<Route exact path="/new" component={CreateUser} />
						<Route exact path="/:userId" component={EditUser} />
						<Route exact path="/" component={MainScreen} />
					</Switch>
					<AppNotifications />
				</AppContent>
			</AppContainer>
		</HashRouter>
	</Provider>
);

App.propTypes = {
	store: PropTypes.object
};

export default App;
