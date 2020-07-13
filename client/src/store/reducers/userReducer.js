import {
  LOAD_USER,
  SET_USER_PROFILE_LOADING,
  SUCCESS_LOAD_USER,
  FAILURE_LOAD_USER,
  
  SIGN_UP_USER,
  SIGN_IN_USER,
  CLEAR_AUTH_ERROR,
  FAILURE_AUTH_USER,
  SUCCESS_AUTH_USER,
  SET_AUTH_USER_LOADING,

  LOGOUT_USER
} from '../actions/types';

const userInitialState = {
  user: {},
  token: null,
  userProfileLoading: true,
  isAuthenticated: false,
  authError: '',
  authUserLoading: false
}

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        authError: ''
      }
    // User authorization (signin/signup)
    case SET_AUTH_USER_LOADING:
      return {
        ...state,
        authUserLoading: true
      }
    case SUCCESS_AUTH_USER:
      const token = localStorage.setItem("token", action.payload);
      return {
        ...state,
        token,
        authUserLoading: false,
        isAuthenticated: true
      }
    case FAILURE_AUTH_USER:
      return {
        ...state,
        isAuthenticated: false,
        authError: action.payload,
        authUserLoading: false
      }
    // Sign in user
    case SIGN_IN_USER:
      return {
        ...state,
        authError: ''
      }
    // Sign up user
    case SIGN_UP_USER:
      return {
        ...state,
        authError: ''
      }
    // Load information about user
    case LOAD_USER:
      return {
        ...state,
        user: action.payload
      }
    case SUCCESS_LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        userProfileLoading: false
      }
    case FAILURE_LOAD_USER:
      return {
        ...state,
        user: {},
        userProfileLoading: false
      }
    case SET_USER_PROFILE_LOADING:
      return {
        ...state,
        userProfileLoading: true
      }
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        authError: ''
      }
    default:
      return state
  }
}