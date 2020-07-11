import {
  REGISTER_USER,
  LOAD_USER,
  LOGOUT_USER,
  SET_USER_PROFILE_LOADING,
  SIGN_IN_USER,
  SUCCESS_LOAD_USER,
  FAILURE_LOAD_USER,
  FAIL_AUTH,
  CLEAR_AUTH_ERROR,
} from '../actions/types';
import {
  LOAD_USER_ASYNC
} from '../sagas/sagaTypes';
import axios from 'axios';

// Register new user profile
export const registerUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/auth/signup', user, config);

    localStorage.setItem("token", res.data.token);
    dispatch({
      type: REGISTER_USER,
      payload: res.data.token
    });
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      dispatch({
        type: FAIL_AUTH,
        payload: err.response.data.msg
      })
    }
  }
}

// Sign in to user's profile
export const signInUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/auth/signin', user, config);

    localStorage.setItem("token", res.data.token);
    dispatch({
      type: SIGN_IN_USER,
      payload: res.data.token,
    })
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: FAIL_AUTH,
      payload: err.response.data.msg
    })
  }
} 

// Load information about logged user
export const loadUser = (userData) => ({ type: LOAD_USER, payload: userData })
export const loadUserAsync = () => ({ type: LOAD_USER_ASYNC })
export const successLoadUser = () => ( { type: SUCCESS_LOAD_USER } );
export const failureLoadUser = () => ( { type: FAILURE_LOAD_USER } );

// User profile loading process
export const setUserProfileLoading = () => {
  return {
    type: SET_USER_PROFILE_LOADING
  }
}

// Authorization clear error message
export const clearAuthError = () => {
  return {
    type: CLEAR_AUTH_ERROR,
  }
}

// Logout current user
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  }
}