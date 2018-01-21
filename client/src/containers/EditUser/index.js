import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withApollo, graphql } from 'react-apollo';
import compose from 'lodash.compose';

import Paper from 'material-ui/Paper';
import Input from 'components/Input';
import Form from 'components/Form';
import Button from 'material-ui/Button';


import {
	userQuery,
	editUserQuery,
	usersListQuery
} from 'query';

import validate from './validate';

class EditUser extends React.Component {
	editUser = (data) => {
		const { client, match, history } = this.props;

		client.mutate({
			mutation: editUserQuery,
			variables: {
				_id: match.params.userId,
				...data
			},
			update: (proxy, { data: { editUser } }) => {
				const data = proxy.readQuery({ query: usersListQuery });

				data.users = data.users.filter(user => user._id !== editUser._id);
				data.users.push(editUser);

				proxy.writeQuery({ query: usersListQuery, data });
			}
		})
			.then(() => history.goBack());
	};

	render() {
		const { handleSubmit } = this.props;

		return (
			<Paper>
				<Form onSubmit={handleSubmit(this.editUser)}>
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
						Edit
					</Button>
				</Form>
			</Paper>
		);
	}
}


EditUser.propTypes = {
	client: PropTypes.object,
	history: PropTypes.object,
	match: PropTypes.object,
	handleSubmit: PropTypes.func
};

export default compose(
	withApollo,
	graphql(
		userQuery,
		{
			options: (props) => ({
				variables: {
					_id: props.match.params.userId
				}
			}),
			props: ({ data: { user } }) => ({
				initialValues: user
			})
		},
	),
	reduxForm({
		form: 'CreateUserForm',
		validate
	}),
)(EditUser);
