import React from 'react';

import { withApollo, graphql } from 'react-apollo';
import compose from 'lodash.compose';

import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import CheckIcon from 'material-ui-icons/Check';
import SaveIcon from 'material-ui-icons/Save';

import {
	userQuery,
	editUserQuery
} from 'query';

import { Container, SubmitWrapper, Load } from './styles';

class EditUser extends React.Component {
	state = {
		name: '',
		email: ''
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
			}
		})
			.then(() => history.goBack())
			.catch((e) => console.error(e))
	};

	editFieldStore = (e) => {
		e.persist();

		this.setState(() => ({
			[e.target.name]: e.target.value
		}));
	};

	render() {
		const { data } = this.props;

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
