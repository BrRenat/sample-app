import React, { Component, PropTypes } from 'react';
import { withApollo, graphql } from 'react-apollo';
import compose from 'lodash.compose';
import { Link } from 'react-router-dom';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Checkbox from 'material-ui/Checkbox';

import {
	usersListQuery,
	removeUserArrayQuery
} from 'query';


class MainScreen extends Component {
	state = {
		checked: [],
	};

	toggleCheckedElement = (e) => {
		const { value } = e.target;

		e.persist();

		this.setState(({ checked }) => ({
			checked: checked.includes(value)
				? checked.filter(elm => elm !== value)
				: [...checked, value]
		}));
	};

	removeUsers = () => {
		const { client } = this.props;
		const { checked } = this.state;

		client.mutate({
			mutation: removeUserArrayQuery,
			refetchQueries: [ { query: usersListQuery }],
			variables: {
				_id: checked
			},
		})
			.then(() => this.setState(() => ({ checked: [] })))
			.catch(() => this.setState(() => ({ checked: [] })))
	};

	render() {
		const { data } = this.props;
		const { checked } = this.state;

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
									<TableCell><Link to={`/${_id}`}>Edit</Link></TableCell>
									<TableCell>
										<Checkbox
											onClick={this.toggleCheckedElement}
											value={_id}
											checked={checked.includes(_id)}
											tabIndex={-1}
											disableRipple
										/>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					}
				</Table>

				<Button component={Link} to="/new">
					Add User
				</Button>

				<Button
					onClick={this.removeUsers}
					disabled={checked.length === 0}
				>
					Remove
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
