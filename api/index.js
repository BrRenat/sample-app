import 'babel-core/register';
import 'babel-polyfill';

import initMongoDB from './src/db';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const helperMiddleware = [
	cors({ origin: 'http://195.62.70.104:8080' }),
	bodyParser.json(),
	bodyParser.text({ type: 'application/graphql' }),
	(req, res, next) => {
		if (req.is('application/graphql')) {
			req.body = { query: req.body };
		}
		next();
	}
];

(async () => {
	try {
		global.MongoDB = await initMongoDB();

		const schema = makeExecutableSchema(require('./src/schema'));

		express()
			.use('/api', ...helperMiddleware, graphqlExpress({ schema }))
			.use(
				'/graphiql',
				graphiqlExpress({
					endpointURL: '/api',
				}),
			)
			.listen(process.env.PORT || 3000, () => {
				console.log('Server running');
			});
	} catch (e) {
		console.error(e);
	}
})();
