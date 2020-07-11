import { all } from 'redux-saga/effects'
import { watchLoadUserAsync } from './userSaga';

// Export root saga
export default function* rootSaga() {
  yield all([
    watchLoadUserAsync()
  ])
}