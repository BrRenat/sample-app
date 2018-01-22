require('babel-core/register');
require('babel-polyfill');

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import initMongoDB from './src/db';

const config = {
	api: {
		url: process.env.STATE === 'local' ? 'localhost' : '195.62.70.104',
		port: 3000
	}
};

const helperMiddleware = [
	cors({ origin: '*' }),
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
			.use('/', express.static('/root/isina/client/build'))
			.use('/api', ...helperMiddleware, graphqlExpress({ schema }))
			.use(
				'/graphiql',
				graphiqlExpress({
					endpointURL: '/api'
				}),
			)
			.listen(config.api.port, () => {
				console.log('Server running');
			});
	} catch (e) {
		console.error(e);
	}
})();
