import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';

import App from './app';
import client from './client';

const throwError = ({ error }) => { throw error; };

render(
	<ApolloProvider  client={client}>
		<AppContainer errorReporter={throwError}>
			<App />
		</AppContainer>
	</ApolloProvider>,
	document.getElementById('root'),
);

if (module.hot) {
	module.hot.accept('./app', () => {
		System.import('./app').then((RootModule) => {
			const UpdatedRoot = RootModule.default;

			render(
				<ApolloProvider  client={client}>
					<AppContainer errorReporter={throwError}>
						<UpdatedRoot />
					</AppContainer>
				</ApolloProvider>,
				document.getElementById('root'),
			);
		});
	});
}
