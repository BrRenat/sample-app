const { createUser, users, user } = require('./resolvers/user');

const typeDefs = `
	type User { 
		id: ID! 
		name: String 
		email: String 
	}
	
	type Query { 
		users: [User]
		user(id: ID): User
	}
	
	type Mutation {
		createUser(name: String, email: String): User
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
		createUser
	}
};

module.exports = {
	typeDefs,
	resolvers
};
