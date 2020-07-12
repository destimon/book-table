import { all } from 'redux-saga/effects'
import { watchLoadUserAsync, watchSignInUserAsync } from './userSaga';

// Export root saga
export default function* rootSaga() {
  yield all([
    watchLoadUserAsync(),
    watchSignInUserAsync()
  ])
}