const { ObjectId } = require('mongodb');
const Users = MongoDB.collection('isina.users');

const users = async () => {
	return await Users.find().toArray();
};

const user = async (root, { _id }) => {
	return await Users.findOne(ObjectId(_id));
};

const createUser = async (root, args, context, info) => {
	const res = await Users.insert(args);
	return true;
};

const editUser = async (root, { _id, name, email }) => {
	const userRes = await user(null, { _id });

	if (!userRes) {
		return false;
	}

	const filter = { _id: ObjectId(_id) };

	const query = {
		$set: {
			name,
			email,
		}
	};

	const updatedUser = await Users.updateOne(filter, query);

	return !!updatedUser.modifiedCount;
};

const deleteUser = async (root, { _id }) => {
	const res = await Users.deleteOne({ _id: ObjectId(_id) });

	return !!res.deletedCount;
};

module.exports = {
	createUser,
	editUser,
	deleteUser,
	users,
	user,
};
