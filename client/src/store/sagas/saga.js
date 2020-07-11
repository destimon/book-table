import { all, put, takeEvery, call } from 'redux-saga/effects'
import {
  LOAD_USER_ASYNC,
} from './sagaTypes';
import {
  loadUser,
  successLoadUser,
} from '../actions/userAction';
import axios from 'axios';
import { ajax_config } from '../../misc/ajaxConfig';

// Load user async saga

function* loadUserAsync() {
  try {
    const res = yield call(() => {
      return axios.get('/api/profile', ajax_config)
    });
  
    console.log(res.data)
    yield put(loadUser(res.data));
    yield put(successLoadUser());
  } catch (err) {
    yield put()
  }
}

function* watchLoadUserAsync() {
  yield takeEvery(LOAD_USER_ASYNC, loadUserAsync)
}

// Export root saga

export default function* rootSaga() {
  yield all([
    watchLoadUserAsync()
  ])
}