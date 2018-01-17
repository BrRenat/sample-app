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
		id: String 
		name: String 
		email: String 
	}
	
	type Query { 
		users: [User]
	}
	
	type Mutation {
		createUser(id: String, name: String, email: String): User
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
				}
			},
			// Post: {
			// 	users: async ({_id}) => {
			// 		return (await Comments.find({postId: _id}).toArray()).map(prepare)
			// 	}
			// },
			// Comment: {
			// 	post: async ({postId}) => {
			// 		return prepare(await Posts.findOne(ObjectId(postId)))
			// 	}
			// },
			Mutation: {
				createUser: async (root, args, context, info) => {
					const res = await Users.insert(args);
					return await Users.findOne({_id: res.insertedIds[1]});
				}
				// createComment: async (root, args) => {
				// 	const res = await Comments.insert(args)
				// 	return prepare(await Comments.findOne({_id: res.insertedIds[1]}))
				// },
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
