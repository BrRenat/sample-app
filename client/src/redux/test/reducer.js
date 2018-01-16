import { createReducer } from 'redux-act'
import { SUCCESS } from 'redux/ajax/status'
import * as actions from './actions'

const initialState = {}

const testReducer = createReducer({
  [actions.testRequestGet[SUCCESS]]: (state, payload) => ({
    ...state,
    testRequestGetResult: payload,
  }),
  [actions.testRequestPost[SUCCESS]]: (state, payload) => ({
    ...state,
    testRequestPostResult: payload,
  }),
  [actions.testAction]: (state, payload) => ({
    ...state,
    testActionResult: payload
  }),
}, initialState)

export default testReducer
