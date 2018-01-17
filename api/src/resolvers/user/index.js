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

module.exports = {
	createUser,
	users,
	user,
};
