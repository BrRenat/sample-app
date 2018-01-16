import test from 'redux/test/saga'

export function * rootSaga () {
  yield [
    test(),
  ]
}
