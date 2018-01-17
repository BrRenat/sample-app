import React, { Component, PropTypes } from 'react';
import { withApollo, graphql } from 'react-apollo';
import compose from 'lodash.compose';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

import {
	usersListQuery
} from 'query';


class MainScreen extends Component {
	render() {
		const { data, loading } = this.props;

		if (data.loading) {
			return (
				<Paper>
					<CircularProgress />
				</Paper>
			);
		}

		return (
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					{data.users &&
						<TableBody>
							{data.users.map(({ name, _id, email }) =>
								<TableRow
									key={_id}
								>
									<TableCell>{name}</TableCell>
									<TableCell>{email}</TableCell>
									<TableCell><a href={_id}>Edit</a></TableCell>
								</TableRow>
							)}
						</TableBody>
					}
				</Table>

				<Button component="a" href="new">
					Add User
				</Button>
			</Paper>
		);
	}
}

MainScreen.propTypes = {
	testAction: PropTypes.func,
	testActionResult: PropTypes.any
};

export default compose(
	withApollo,
	graphql(
		usersListQuery,
	),
)(MainScreen);
