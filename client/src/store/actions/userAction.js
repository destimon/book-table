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
  SET_AUTH_USER_LOADING,
  SUCCESS_SIGN_IN_USER,
  FAILURE_SIGN_IN_USER,
} from './types';
import {
  LOAD_USER_ASYNC,
  SIGN_IN_USER_ASYNC,
  SIGN_UP_USER_ASYNC
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

export const signUpUserAsync = (formData) => ({ type: SIGN_UP_USER_ASYNC, payload: formData });

// Authorization (signup/signin)
export const setAuthUserLoading = () => ({ type: SET_AUTH_USER_LOADING });

// Sign in to user's profile
export const signInUser = () => ({ type: SIGN_IN_USER });
export const successSignInUser = (token) => ({ type: SUCCESS_SIGN_IN_USER, payload: token });
export const failureSignInUser = (authError) => ({ type: FAILURE_SIGN_IN_USER, payload: authError })
export const signInUserAsync = (formData) => ({ type: SIGN_IN_USER_ASYNC, payload: formData });


// Load information about logged user
export const loadUser = (userData) => ({ type: LOAD_USER, payload: userData });
export const loadUserAsync = () => ({ type: LOAD_USER_ASYNC });
export const successLoadUser = () => ( { type: SUCCESS_LOAD_USER } );
export const failureLoadUser = () => ( { type: FAILURE_LOAD_USER } );
export const setUserProfileLoading = () => ( { type: SET_USER_PROFILE_LOADING });

// Authorization clear error message
export const clearAuthError = () => ({ type: CLEAR_AUTH_ERROR })

// Logout current user
export const logoutUser = () => ({ type: LOGOUT_USER })