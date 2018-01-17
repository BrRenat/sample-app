import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withApollo, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { testAction } from 'redux/test/actions';
import { testActionResultSelector } from 'redux/test/selectors';

import { MainContainer } from './styles';

const mapDispatchToProps = {
	testAction
};

const mapStateToProps = createStructuredSelector({
	testActionResult: testActionResultSelector
});

class MainScreen extends Component {

	createUser = () => {
		this.props.client.mutate(
			{
				mutation: 'createUser',
				variables: { name: "new user", email: "test" },
			}
		)
	}

	render() {
		const { data } = this.props;

		return (
			<MainContainer>
				Main page
				{data.users &&
					<ul>
						{data.users.map(({ name, id }) =>
							<li key={id}>{name}</li>
						)}
					</ul>
				}
				<button onClick={this.createUser}>Create user</button>
			</MainContainer>
		);
	}
}

MainScreen.propTypes = {
	testAction: PropTypes.func,
	testActionResult: PropTypes.any
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withApollo,
	graphql(gql`
		query UserList {
			users {
				name
				email
			}
		}
	`),
	graphql(gql`
		mutation CreateUserMutation($name: String!) {
		  createUser(name: $name) {
		  	id
		  	name
		  	email
		  }
		}
	`),
)(MainScreen);
