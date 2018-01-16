import { createSelector } from 'reselect'

const testSelector = state => state.test

export const testRequestGetResultSelector = createSelector(
  testSelector,
  ({ testRequestGetResult }) => testRequestGetResult,
)

export const testRequestPostResultSelector = createSelector(
  testSelector,
  ({ testRequestPostResult }) => testRequestPostResult,
)

export const testActionResultSelector = createSelector(
  testSelector,
  ({ testActionResult }) => testActionResult,
)
