import {
	user,
	users,

	createUser,
	editUser,
	deleteUsers
} from './resolvers/user';

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
		deleteUsers(_id: [String]): User
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
		deleteUsers
	}
};

module.exports = {
	typeDefs,
	resolvers
};
