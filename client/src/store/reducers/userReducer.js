import {
  REGISTER_USER,
  LOAD_USER,
  SET_USER_PROFILE_LOADING,
  LOGOUT_USER,
  SUCCESS_LOAD_USER,
  FAILURE_LOAD_USER,
  SIGN_IN_USER,
  // FAIL_AUTH,
  CLEAR_AUTH_ERROR,
  FAILURE_SIGN_IN_USER,
  SUCCESS_SIGN_IN_USER,
  SET_AUTH_USER_LOADING
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
    // Sign in user
    case SIGN_IN_USER:
      return {
        ...state,
        authError: ''
      }
    case SUCCESS_SIGN_IN_USER:
      const token = localStorage.setItem("token", action.payload);
      return {
        ...state,
        token,
        authUserLoading: false,
        isAuthenticated: true
      }
    case FAILURE_SIGN_IN_USER:
      return {
        ...state,
        isAuthenticated: false,
        authError: action.payload,
        authUserLoading: false
      }
    // Sign up user
    case REGISTER_USER:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
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
        user: null,
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