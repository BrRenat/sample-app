require('babel-core/register');
require('babel-polyfill');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://195.62.70.104:27017/admin';

const typeDefs = `
	type User { 
		id: ID! 
		name: String 
		email: String 
	}
	
	type Query { 
		users: [User]
		user(id: ID): User
	}
	
	type Mutation {
		createUser(name: String, email: String): User
	}
	
	schema {
		query: Query
		mutation: Mutation
	}
`;

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
		const db = await MongoClient.connect(MONGO_URL);
		await db.authenticate('admin', 'Hg98t3Nsj');
		const Users = db.collection('isina.users');

		const resolvers = {
			Query: {
				users: async () => {
					return await Users.find().toArray();
				},
				user: async (root, { id }) => {
					return await Users.findOne(ObjectId(id));
				}
			},
			Mutation: {
				createUser: async (root, args, context, info) => {
					const res = await Users.insert(args);
					return await Users.findOne({ id: res.insertedIds[1] });
				}
			}
		};

		const schema = makeExecutableSchema({
			typeDefs,
			resolvers
		});

		express()
			.use('/api', ...helperMiddleware, graphqlExpress({ schema }))
			.listen(process.env.PORT || 3000, () => {
				console.log('Server running');
			});
	} catch (e) {
		console.error(e);
	}
})();
