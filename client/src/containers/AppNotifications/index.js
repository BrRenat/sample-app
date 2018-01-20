import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { removeApiError } from 'redux/apiError/actions'
import { apiErrors } from 'redux/apiError/selectors'

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';


const mapDispatchToProps = {
	removeApiError,
};

const mapStateToProps = createStructuredSelector({
	apiErrors,
});

class AppNotifications extends React.Component {
	render () {
		const { apiErrors, removeApiError } = this.props;

		if (!apiErrors || !apiErrors.length) {
			return null
		}

		return apiErrors.map(({ id, message }) =>
			<Snackbar
				key={id}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={true}
				autoHideDuration={2000}
				onClose={() => removeApiError(id)}
				SnackbarContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={<span id="message-id">{message}</span>}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => removeApiError(id)}
					>
						<CloseIcon />
					</IconButton>,
				]}
			/>
		)
	}
}

AppNotifications.propTypes = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNotifications)

