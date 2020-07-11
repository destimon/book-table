import { put, takeEvery, call } from 'redux-saga/effects'
import {
  LOAD_USER_ASYNC,
} from './sagaTypes';
import {
  loadUser,
  successLoadUser,
  setUserProfileLoading,
  failureLoadUser
} from '../actions/userAction';
import axios from 'axios';
import { ajax_config } from '../../misc/ajaxConfig';

// SAGA WORKERS ---

// Load user async saga
function* loadUserAsync() {
  try {
    const res = yield call(() => axios.get('/api/profile', ajax_config ));
  
    yield put(setUserProfileLoading());
    yield put(loadUser(res.data));
    yield put(successLoadUser());
  } catch (err) {
    yield put(failureLoadUser());
  }
}

// SAGA WATCHERS ---

export function* watchLoadUserAsync() { yield takeEvery(LOAD_USER_ASYNC, loadUserAsync) }