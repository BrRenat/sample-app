import React from 'react';
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom';

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

const App = () => (
	<BrowserRouter>
		<AppContainer>
			<AppContent>
				<Switch>
					<Route exact path="/new" component={CreateUser} />
					<Route exact path="/:userId" component={EditUser} />
					<Route exact path="/" component={MainScreen} />
				</Switch>
			</AppContent>
		</AppContainer>
	</BrowserRouter>
);

export default App;
