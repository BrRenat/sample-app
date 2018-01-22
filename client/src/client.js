import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import nanoid from 'nanoid';

import { addNetworkError } from 'redux/networkError/actions';
import { addApiError } from 'redux/apiError/actions';

import store from 'redux/configureStore';

const config = {
	api: {
		url: process.env.STATE === 'local' ? 'localhost' : '195.62.70.104',
		port: 3000
	}
};

const errorLink = onError(({ networkError, graphQLErrors }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, path }) => {
			const id = nanoid();
			store.dispatch(addApiError({
				id,
				error: { id, message, path }
			}));
		});
	}

	if (networkError) {
		const id = nanoid();
		store.dispatch(addNetworkError({
			id,
			error: { id, message: networkError }
		}));
	}
});

const httpLink = new HttpLink({ uri: `http://${config.api.url}:${config.api.port}/api` });

const link = ApolloLink.from([
	errorLink,
	httpLink
]);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
});

export default client;
