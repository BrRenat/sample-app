import gql from 'graphql-tag';

export const usersListQuery = gql`
	query UserList {
		users {
			_id
			name
			email
		}
	}
`;

export const userQuery = gql`
	query User($_id: String!) {
		user(_id: $_id) {
			_id
			name
			email
		}
	}
`;

export const addUserQuery = gql`
	mutation CreateUserMutation($name: String!, $email: String!) {
		createUser(name: $name, email: $email) {
			_id
			name
			email
		}
	}
`;

export const editUserQuery = gql`
	mutation EditUserMutation($_id: String!, $name: String!, $email: String!) {
		editUser(_id: $_id, name: $name, email: $email) {
			_id
			name
			email
		}
	}
`;
