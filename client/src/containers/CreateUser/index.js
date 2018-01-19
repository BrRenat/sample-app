import React from 'react';

import { withApollo, graphql } from 'react-apollo';
import compose from 'lodash.compose';

import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';

import {
	addUserQuery,
  usersListQuery
} from 'query';

class CreateUser extends React.Component {
	state = {
		name: '',
		email: ''
	};

	createUser = () => {
		const { client, history } = this.props;
		const { name, email } = this.state;

		client.mutate({
			mutation: addUserQuery,
			refetchQueries: [ { query: usersListQuery }],
			variables: { name, email }
		})
			.then(() => history.goBack())
			.catch((e) => console.error(e));
	};

	editFieldStore = (e) => {
		e.persist();

		this.setState(() => ({
			[e.target.name]: e.target.value
		}));
	};

	render() {
		return (
			<Paper>
				<Input
					placeholder="User name"
					onChange={this.editFieldStore}
					inputProps={{
						name: 'name'
					}}
				/>

				<Input
					placeholder="User email"
					onChange={this.editFieldStore}
					inputProps={{
						name: 'email'
					}}
				/>

				<Button
					onClick={this.createUser}
					color="primary"
					raised
				>
					Create
				</Button>
			</Paper>
		);
	}
}


CreateUser.propTypes = {
};

export default compose(
	withApollo,
	graphql(
		addUserQuery,
	),
)(CreateUser);
