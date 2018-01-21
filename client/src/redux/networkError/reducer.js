import { createReducer } from 'redux-act'
import * as actions from './actions'

const initialState = {};

const networkErrorReducer = createReducer({
	[actions.addNetworkError]: (state, { id, error }) => ({
		...state,
		errors: {
			...state.errors,
			[id]: error,
		}
	}),
	[actions.removeNetworkError]: (state, id) => {
		const { [id]: _, ...updatedErrors } = state.errors;
		return ({
			...state,
			errors: updatedErrors,
		})
	},
}, initialState);

export default networkErrorReducer
