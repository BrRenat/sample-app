import { takeLatest, select, put } from 'redux-saga/effects'
import { SUCCESS, REQUEST } from 'redux/ajax/status'
import { handleLatestAjaxAction } from 'redux/ajax/saga'

import { testRequestGetResultSelector } from './selectors'
import * as actions from './actions'

function * testRequestGet ({ payload }) {
  const testRequestGetResultData = yield select(testRequestGetResultSelector)

  if (!testRequestGetResultData) {
    yield put(actions.testRequestGet[REQUEST]({ params: payload }))
  }
}

export default function * test () {
  yield [
    handleLatestAjaxAction(actions.testRequestGet),
    handleLatestAjaxAction(actions.testRequestPost),
    takeLatest(actions.testRequestGetIsNeeded.getType(), testRequestGet),
  ]
}
