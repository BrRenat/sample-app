import { createAction } from 'redux-act'
import * as status from './status'

export function createAjaxAction (actionName, requestOptions) {
  return {
    id: actionName,
    [status.REQUEST]: createAction(`${actionName} ${status.REQUEST}`,
      // paylod reducer
      payload => payload,
      // meta reducer
      (payload, resolve = null, reject = null) => ({
        resolve, // used when action is wrapped in promise
        reject, // used when action is wrapped in promise
        requestOptions,
      }),
    ),
    [status.SUCCESS]: createAction(`${actionName} ${status.SUCCESS}`),
    [status.FAILURE]: createAction(`${actionName} ${status.FAILURE}`),
  }
}

/*
 * Wraps action in Promise
 * Provide resolve, reject to action's meta data
 *
 * @param action - `REQUEST` action made by createAjaxAction.
 * @param payload - payload for `REQUEST` action.
 *
 */
export function promisifyAjaxAction (action, payload) {
  return new Promise((resolve, reject) => action(payload, resolve, reject))
}
