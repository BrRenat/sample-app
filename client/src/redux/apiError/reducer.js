import { createReducer } from 'redux-act'
import * as actions from './actions'

const initialState = {};

const apiErrorReducer = createReducer({
	[actions.addApiError]: (state, { id, error }) => ({
		...state,
		errors: {
			...state.errors,
			[id]: error,
		}
	}),
	[actions.removeApiError]: (state, id) => {
		const { [id]: _, ...updatedErrors } = state.errors;
		return ({
			...state,
			errors: updatedErrors,
		})
	},
}, initialState);

export default apiErrorReducer
