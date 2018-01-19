const { ObjectId } = require('mongodb');
const Users = MongoDB.collection('isina.users');

const cleanObjVal = (obj) => {
	return Object.keys(obj).reduce((prev, cur) => {
		const val = obj[cur];

		if (val) {
			prev[cur] = val
		}

		return prev;
	}, {});
};

const findUserData = async (query) => {
	return await Users.find(query).toArray();
};

//query hack don't touch
const getUserDataByID = async (query) => {
	return await findUserData({ _id : query });
};

const checkUserEmail = async (email) => {
	if (!/\S+@\S+/.test(email)) {
		throw ('Email invalid');
	}

	const res = await findUserData({ email });

	if (res.length > 0) {
		throw ('Email found');
	}

	return true;
};

const checkUserName = async (name) => {
	if (!name) {
		throw ('Name empty');
	}

	const res = await findUserData({ name });

	if (res.length > 0) {
		throw ('Name found');
	}

	return true;
};

const validateUserData = async ({ name, email }, all = true) => {
	if (all || (!all && name)) {
		await checkUserName(name);
	}

	if (all || (!all && email)) {
		await checkUserEmail(email);
	}

	return true;
};

const users = async () => {
	return await Users.find().toArray();
};

const user = async (root, { _id }) => {
	return await Users.findOne(ObjectId(_id));
};

const createUser = async (root, { name, email }, context, info) => {
	await validateUserData({ name, email });

	const res = await Users.insert({ name, email });

	if (!res.ops[0]) {
		throw ('User add error');
	}

	return res.ops[0];
};

const editUser = async (root, { _id, name, email }) => {
	const set = await cleanObjVal({ name, email });

	await validateUserData(set, false);

	_id = ObjectId(_id);

	if (!Object.keys(set).length) {
		throw 'Fields empty'
	}

	let userResult = await getUserDataByID(_id);

	if (!userResult.length) {
		throw ('User not found');
	}

	const filter = { _id };

	const query = {
		$set: set
	};

	const updatedUser = await Users.updateMany(filter, query);

	if (!updatedUser.modifiedCount) {
		throw ('User update error');
	}

	userResult = await getUserDataByID(_id);

	return userResult[0];
};

const deleteUser = async (root, { _id }) => {
	const res = await Users.deleteOne({ _id: ObjectId(_id) });

	if (!res.deletedCount) {
		throw ('User delete error');
	}

	return !!res.deletedCount;
};

const deleteUserArray = async (root, { _id }) => {
	_id = _id.map((val) => ObjectId(val));

	const userResult = await getUserDataByID({ $in: _id });

	if (!userResult.length) {
		throw ('Users not found');
	}

	const res = await Users.deleteMany({ _id : { $in: _id } });

	if (!res.deletedCount) {
		throw ('User delete error');
	}

	return {
		_id: userResult.map(({ _id }) => _id)
	};
};

module.exports = {
	createUser,
	editUser,
	deleteUser,
	deleteUserArray,
	users,
	user,
};
