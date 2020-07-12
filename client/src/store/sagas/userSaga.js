import { put, takeEvery, call } from 'redux-saga/effects'
import {
  LOAD_USER_ASYNC,
  SIGN_IN_USER_ASYNC,
  SIGN_UP_USER_ASYNC
} from './sagaTypes';
import {
  loadUser,
  successLoadUser,
  setUserProfileLoading,
  failureLoadUser,

  
  setAuthUserLoading,
  signInUser,
  signUpUser,
  successAuthUser,
  failureAuthUser
} from '../actions/userAction';
import axios from 'axios';
import { auth_config, json_content_config } from '../../misc/ajaxConfig';

// SAGA WORKERS ---

// Load user async saga
function* loadUserAsync() {
  try {
    const res = yield call(() => axios.get('/api/profile', auth_config() ));
  
    yield put(setUserProfileLoading());
    yield put(loadUser(res.data));
    yield put(successLoadUser());
  } catch (err) {
    yield put(failureLoadUser());
  }
}

// Sign up user async saga
function* signUpUserAsync({ payload }) {
  console.log(payload)
  try {
    const res = yield call(() => axios.post('/api/auth/signup', payload, json_content_config))

    yield put(setAuthUserLoading());
    yield put(signUpUser());
    yield put(successAuthUser(res.data.token));
    yield put({ type: LOAD_USER_ASYNC });
  } catch (err) {
    yield put(failureAuthUser(err.response.data.msg));
  } 
}

// Sign in user async saga
function* signInUserAsync({ payload }) {
  try {
    const res = yield call(() => axios.post('/api/auth/signin', payload, json_content_config))

    yield put(setAuthUserLoading());
    yield put(signInUser());
    yield put(successAuthUser(res.data.token));
    yield put({ type: LOAD_USER_ASYNC });
  } catch (err) {
    yield put(failureAuthUser(err.response.data.msg));
  }
}

// SAGA WATCHERS ---

export function* watchLoadUserAsync() { yield takeEvery(LOAD_USER_ASYNC, loadUserAsync) };
export function* watchSignInUserAsync() { yield takeEvery(SIGN_IN_USER_ASYNC, signInUserAsync) };
export function* watchSignUpUserAsync() { yield takeEvery(SIGN_UP_USER_ASYNC, signUpUserAsync ) };