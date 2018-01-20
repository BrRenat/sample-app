import { ObjectId } from 'mongodb';
import isEmail from 'validator/lib/isEmail';

import { isUserExist } from './utils';

const Users = MongoDB.collection('isina.users');

/*
* Queries
*/
export const users = async () => {
	return await Users.find().toArray();
};

export const user = async (root, { _id }) => {
	return await Users.findOne(ObjectId(_id));
};

/*
* Mutations
*/
export const createUser = async (root, { name, email }, context, info) => {
	if (!isEmail(email)) {
		throw 'Invalid email'
	}

	if (await isUserExist(email)) {
		throw 'User exist'
	}

	const createResult = await Users.insertOne({ name, email });

	if (!createResult.insertedId) {
		throw 'User created failed'
	}

	return await user(null, { _id: createResult.insertedId });
};

export const editUser = async (root, { _id, name, email }) => {
	if (email && !isEmail(email)) {
		throw 'Invalid email'
	}

	if (!await Users.findOne(ObjectId(_id))) {
		throw 'User not exist'
	}

	const updateResult = await Users.findOneAndUpdate(
		{ _id: ObjectId(_id) },
		{ name, email }
	);

	if (!updateResult.value) {
		throw 'User update error'
	}

	return await user(null, { _id });
};

export const deleteUsers = async (root, { _id }) => {
	let userIds = Array.isArray(_id)
		? _id
		: [_id];

	userIds = userIds.map(id => ObjectId(id));

	const deleteResult = await Users.deleteMany({ _id : { $in: userIds } });

	if (!deleteResult.deletedCount) {
		throw 'User delete error'
	}

	return true;
};
