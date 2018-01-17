require('babel-core/register');
require('babel-polyfill');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://195.62.70.104:27017/';

const authMongoUser = {
	user: 'admin',
	pass: 'Hg98t3Nsj'
};

const dataBases = ['isina'];

(async () => {
	try {
		const collectionChemes = {
			isina: `
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
			`
		};

		const collectionMethods = {
			isina: async (db) => {
				const Users = await db.collection('isina.users');

				let findTestUser = await Users.find({
					name: 'test'
				}).toArray();

				if (findTestUser.length === 0) {
					await Users.insertOne({
						name: 'test',
						email: 'test@test.com'
					}, (err) => {
						console.log('user created:', !err);
					});
				} else {
					console.log('userList', await Users.find().toArray());

					// Users.deleteOne({name: 'test'}, (err) => {
					//   console.log('user deleted:', !err);
					// });
				}
			}
		};

		dataBases.forEach(async (database) => {
			if (!collectionChemes[database] || !collectionChemes[database]) {
				return;
			}

			const cheme = collectionChemes[database];

			await MongoClient.connect(MONGO_URL + 'admin', async (err, db) => {
				await db.authenticate(authMongoUser.user, authMongoUser.pass);

				await collectionMethods[database](db, cheme);
			});
		});
	} catch (e) {
		console.error(e);
	}
})();
