import React from 'react';

import { withApollo, graphql } from 'react-apollo';
import compose from 'lodash.compose';

import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import CheckIcon from 'material-ui-icons/Check';
import SaveIcon from 'material-ui-icons/Save';

import {
	userQuery,
	editUserQuery,
  usersListQuery
} from 'query';

import { Container, SubmitWrapper, Load } from './styles';

class EditUser extends React.Component {
	state = {
		name: '',
		email: '',
		errors: '',
	};

	editUser = () => {
		const { client, match, history } = this.props;
		const { name, email } = this.state;

		client.mutate({
			mutation: editUserQuery,
			variables: {
				_id: match.params.userId,
				name,
				email
			},
			update: (proxy, { data: { editUser } }) => {
				const data = proxy.readQuery({ query: usersListQuery });

				data.users = data.users.filter(user => user._id !== editUser._id);
				data.users.push(editUser);

				proxy.writeQuery({ query: usersListQuery, data });
			}
		})
			.then(() => history.goBack())
			.catch((e) => {
				this.setState(() => ({
					errors: e.message.split(':')[1].trim(),
				}))
			})
	};

	editFieldStore = (e) => {
		e.persist();

		this.setState(() => ({
			[e.target.name]: e.target.value
		}));
	};

	render() {
		const { data } = this.props;
		const { errors } = this.state;

		if (!data || !data.user) return null;

		return (
			<Container>
				<Input
					defaultValue={data.user.name}
					placeholder="User name"
					onChange={this.editFieldStore}
					inputProps={{
						name: 'name'
					}}
				/>

				<Input
					defaultValue={data.user.email}
					placeholder="User email"
					onChange={this.editFieldStore}
					inputProps={{
						name: 'email'
					}}
				/>

				<SubmitWrapper>
					<Button fab color="primary" onClick={this.editUser}>
						<SaveIcon />
						{/*{true ? <CheckIcon /> : <SaveIcon />}*/}
					</Button>
					{data.loading && <Load size={56}/>}
				</SubmitWrapper>
				{/*<div>{errors}</div>*/}
			</Container>
		);
	}
}


EditUser.propTypes = {
};

export default compose(
	withApollo,
	graphql(
		userQuery,
		{ options: (props) => ({
			variables: {
				_id: props.match.params.userId
			}
		})},
	),
)(EditUser);
