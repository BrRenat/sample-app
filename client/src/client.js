import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
	link: new HttpLink({ uri: 'http://195.62.70.104:3000/api' }),
	cache: new InMemoryCache()
});

export default client;
