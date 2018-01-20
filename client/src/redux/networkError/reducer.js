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
}, initialState);

export default networkErrorReducer
