import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';

import asyncRoute from './asyncRoute';

import { AppContainer, AppContent } from './styles';

const MainScreen = asyncRoute(() => import(
  /* webpackChunkName: "MainScreen" */
  'containers/MainScreen'
));

const App = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <AppContainer>
        <AppContent>
          <Switch>
            <Route exact path="/" component={MainScreen} />
          </Switch>
        </AppContent>
      </AppContainer>
    </HashRouter>
  </Provider>
);

App.propTypes = {
	store: PropTypes.object
};

export default App;
