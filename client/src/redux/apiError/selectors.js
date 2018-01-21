import { createSelector } from 'reselect'

const apiErrorSelector = state => state.apiError;

export const apiErrors = createSelector(
	apiErrorSelector,
	({ errors }) => errors
		? Object.values(errors)
		: null,
);
