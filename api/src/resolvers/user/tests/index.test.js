/* eslint-env jest */

import { ObjectId } from 'mongodb';

import initMongoDB from '../../../db';

const testUser = {
	name: 'Jest test',
	email: 'jesttest@test.com'
};

describe('Test the removeComment method', () => {
	beforeAll(async () => {
		global.MongoDB = await initMongoDB();
	});
})

test('adds 1 + 2 to equal 3', async () => {
	const Users = MongoDB.collection('isina.users');
	const createdResult = await Users.insertOne(testUser);
	const _id = createdResult.insertedId;

	const { user } = require('../index');

	const res = await Users.findOne(ObjectId(_id));

	const testRes = await user(null, { _id });

	expect(testRes).toEqual(res);
});
