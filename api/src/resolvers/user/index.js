const Users = db.collection('isina.users');

const users = async () => {
	return await Users.find().toArray();
};

const user = async (root, { id }) => {
	return await Users.findOne(ObjectId(id));
};

const createUser = async (root, args, context, info) => {
	const res = await Users.insert(args);
	return await Users.findOne({ id: res.insertedIds[1] });
};

module.exports = {
	createUser,
	users,
	user,
};
