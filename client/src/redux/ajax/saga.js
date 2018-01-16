import { call, put, takeLatest } from 'redux-saga/effects'

import * as status from './status'
import ajax from './ajax'

function * success (ajaxAction, action, response) {
  const { meta } = action
  const successAction = ajaxAction[status.SUCCESS]

  // if action is wrapped by Promise, resolve it
  if (meta.resolve) {
    meta.resolve(response)
  }

  yield put(successAction(response))
}

function * failure (ajaxAction, action, error) {
  const { meta } = action
  const failureAction = ajaxAction[status.FAILURE]

  // if action is wrapped by Promise, reject it
  if (meta.reject) {
    meta.reject(error)
  }


  yield put(failureAction(error))
}

export default function * handleAjaxAction (ajaxAction, action) {
  const { payload, meta } = action


  try {
    const response = yield call(ajax, {
      ...meta.requestOptions,
      ...payload,
    })

    yield success(ajaxAction, action, response)
  } catch (error) {
    yield failure(ajaxAction, action, error)
  }
}

export function * handleLatestAjaxAction (ajaxAction) {
  yield takeLatest(ajaxAction[status.REQUEST].getType(), handleAjaxAction.bind(null, ajaxAction))
}
