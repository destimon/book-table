import {
  REGISTER_USER,
  LOAD_USER,
  LOGOUT_USER,
  SET_USER_PROFILE_LOADING,
  SIGN_IN_USER,
  SUCCESS_LOAD_USER
} from '../actions/types';
import axios from 'axios';
// import _ from 'lodash';

export const registerUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('http://localhost:3001/api/auth/signup', user, config);

    localStorage.setItem("token", res.data.token);
    dispatch({
      type: REGISTER_USER,
      payload: res.data.token
    });
    dispatch(loadUser());
  } catch (err) {
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
    const res = await axios.post('http://localhost:3001/api/auth/signin', user, config);

    localStorage.setItem("token", res.data.token);
    dispatch({
      type: SIGN_IN_USER,
      payload: res.data.token,
    })
    dispatch(loadUser());
  } catch (err) {
  }
} 

export const setUserProfileLoading = () => {
  return {
    type: SET_USER_PROFILE_LOADING
  }
}

export const loadUser = () => async (dispatch) => {
  dispatch(setUserProfileLoading());
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem("token"),
    }
  }
  try {
    const res = await axios.get(`http://localhost:3001/api/profile`, config)

    dispatch({
      type: LOAD_USER,
      payload: res.data
    })
    dispatch({
      type: SUCCESS_LOAD_USER,
    })
  } catch (err) {
    dispatch({
      type: LOAD_USER,
      payload: null
    })
  }
}

// Logout current user
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  }
}