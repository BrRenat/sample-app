require('babel-core/register');
require('babel-polyfill');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
// import { MongoClient } from 'mongodb';

// const MONGO_URL = 'mongodb://localhost:27017/blog';

const typeDefs = `
	type User { id: String, name: String, email: String }
	type Query { users: [User] }
`;

const resolvers = {
	Query: {
		users: async () => {
			return ([
				{ id: 1, name: 'User 1', email: 'test1@user.com' },
				{ id: 2, name: 'User 2', email: 'test2@user.com' }
			]);
		}
	}
	// Post: {
	// 	comments: async ({_id}) => {
	// 		return (await Comments.find({postId: _id}).toArray()).map(prepare)
	// 	}
	// },
	// Comment: {
	// 	post: async ({postId}) => {
	// 		return prepare(await Posts.findOne(ObjectId(postId)))
	// 	}
	// },
	// Mutation: {
	// 	createPost: async (root, args, context, info) => {
	// 		const res = await Posts.insert(args)
	// 		return prepare(await Posts.findOne({_id: res.insertedIds[1]}))
	// 	},
	// 	createComment: async (root, args) => {
	// 		const res = await Comments.insert(args)
	// 		return prepare(await Comments.findOne({_id: res.insertedIds[1]}))
	// 	},
	// },
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

const helperMiddleware = [
	cors({ origin: 'http://localhost:8080' }),
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
		// const db = await MongoClient.connect(MONGO_URL)
		// const Users = db.collection('users')
		express()
			.use('/api', ...helperMiddleware, graphqlExpress({ schema }))
			.listen(process.env.PORT || 3000, () => {
				console.log('Server running');
			});
	} catch (e) {
		console.error(e);
	}
})();
