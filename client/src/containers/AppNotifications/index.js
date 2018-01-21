import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { removeApiError } from 'redux/apiError/actions';
import { removeNetworkError } from 'redux/networkError/actions';
import { apiErrors } from 'redux/apiError/selectors';
import { networkErrors } from 'redux/networkError/selectors';

import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';


const mapDispatchToProps = {
	removeApiError,
	removeNetworkError
};

const mapStateToProps = createStructuredSelector({
	apiErrors,
	networkErrors
});

class AppNotifications extends React.Component {
	render() {
		const { apiErrors, removeApiError, networkErrors, removeNetworkError } = this.props;

		let errors = [];

		if (apiErrors && apiErrors.length) {
			errors = apiErrors.map(({ id, message }) =>
				<Snackbar
					key={id}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					open={true}
					autoHideDuration={2000}
					onClose={() => removeApiError(id)}
					SnackbarContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{message || 'Unknown error'}</span>}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={() => removeApiError(id)}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			);
		}

		if (networkErrors && networkErrors.length) {
			networkErrors.forEach(({ id }) =>
				errors.push(<Snackbar
					key={id}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					open={true}
					autoHideDuration={2000}
					onClose={() => removeNetworkError(id)}
					SnackbarContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">Network Error</span>}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={() => removeNetworkError(id)}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>)
			);
		}

		return errors.length
			? errors
			: null;
	}
}

AppNotifications.propTypes = {
	apiErrors: PropTypes.array,
	removeApiError: PropTypes.func,
	networkErrors: PropTypes.array,
	removeNetworkError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNotifications);

