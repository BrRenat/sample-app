require('babel-core/register');
require('babel-polyfill');

const { initdb } = require('./src/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

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
		global.db = await initdb();

		const schema = makeExecutableSchema(require('./src/schema'));

		express()
			.use('/api', ...helperMiddleware, graphqlExpress({ schema }))
			.listen(process.env.PORT || 3000, () => {
				console.log('Server running');
			});
	} catch (e) {
		console.error(e);
	}
})();
