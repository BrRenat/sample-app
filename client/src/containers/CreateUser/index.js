import React from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash.compose';
import { Field, reduxForm } from 'redux-form';
import { withApollo } from 'react-apollo';

import Paper from 'material-ui/Paper';
import Input from 'components/Input';
import Form from 'components/Form';
import Button from 'material-ui/Button';

import validate from './validate';

import {
	addUserQuery,
	usersListQuery
} from 'query';

class CreateUser extends React.Component {
	createUser = (data) => {
		const { client, history } = this.props;

		client.mutate({
			mutation: addUserQuery,
			variables: data,
			update: (proxy, { data: { createUser } }) => {
				const data = proxy.readQuery({ query: usersListQuery });

				data.users.push(createUser);

				proxy.writeQuery({ query: usersListQuery, data });
			}
		})
			.then(() => history.goBack());
	};

	render() {
		const { handleSubmit } = this.props;

		return (
			<Paper>
				<Form onSubmit={handleSubmit(this.createUser)}>
					<Field
						type="text"
						placeholder="Your Name"
						label="Your Name"
						name="name"
						component={Input}
					/>
					<Field
						type="text"
						placeholder="Email"
						label="Email"
						name="email"
						component={Input}
					/>
					<Button
						color="primary"
						type="submit"
						raised
					>
						Create
					</Button>
				</Form>
			</Paper>
		);
	}
}


CreateUser.propTypes = {
	client: PropTypes.object,
	history: PropTypes.object,
	handleSubmit: PropTypes.func
};

export default compose(
	withApollo,
	reduxForm({
		form: 'CreateUserForm',
		validate
	}),
)(CreateUser);
