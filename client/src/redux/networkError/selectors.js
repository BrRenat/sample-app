import { createSelector } from 'reselect'

const networkErrorSelector = state => state.networkError;

export const networkErrors = createSelector(
	networkErrorSelector,
	({ errors }) => errors,
);
