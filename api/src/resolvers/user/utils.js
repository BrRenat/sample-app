const Users = MongoDB.collection('isina.users');

export const isUserExist = async (email) => {
	return await Users.findOne({ email });
};
