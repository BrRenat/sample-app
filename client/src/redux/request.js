import 'whatwg-fetch'
import { call } from 'redux-saga/effects'

function parseJSON (response) {
  return response.json()
}

function checkStatus (response) {
  if ((response.status >= 200 && response.status < 300)) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

const defaultOptions = {}

const requestCall = (url, options, parse) =>
  fetch(url, options)
  .then(checkStatus)
  .then((response) => {
    const result = parse ? parseJSON(response) : response
    if (response.status === 400 && result.errors) {
      const error = new Error(response.statusText)
      error.response = result
    }
    if (response.status === 401) {
      result.err = { status: 401 }
    }
    return result
  })
  .then(response => response)
  .catch(err => ({ err }))


export default function * request (url, options, parse = true) {
  const requestOptions = { ...defaultOptions, ...options }
  const requestResult = yield call(requestCall, url, requestOptions, parse)
  return requestResult
}
