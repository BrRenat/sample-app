const { createUser, editUser, deleteUser, deleteUserArray, users, user } = require('./resolvers/user');

const typeDefs = `
	type User { 
		_id: String 
		name: String 
		email: String 
	}
	
	type Query { 
		users: [User]
		user(_id: String): User
	}
	
	type Mutation {
		createUser(name: String, email: String): User
		editUser(_id: String, name: String, email: String): User
		deleteUser(_id: String): User
		deleteUserArray(_id: [String]): User
	}
	
	schema {
		query: Query
		mutation: Mutation
	}
`;

const resolvers = {
	Query: {
		users,
		user
	},
	Mutation: {
		createUser,
		editUser,
		deleteUser,
		deleteUserArray
	}
};

module.exports = {
	typeDefs,
	resolvers
};
