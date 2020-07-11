import {
  REGISTER_USER,
  LOAD_USER,
  SET_USER_PROFILE_LOADING,
  LOGOUT_USER,
  SUCCESS_LOAD_USER,
  FAILURE_LOAD_USER,
  SIGN_IN_USER,
  FAIL_AUTH,
  CLEAR_AUTH_ERROR
} from '../actions/types';

const userInitialState = {
  user: {},
  token: null,
  userProfileLoading: true,
  isAuthenticated: false,
  authError: '',
}

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        authError: ''
      }
    case SIGN_IN_USER:
      return {
        ...state,
        token: action.payload,
        authError: ''
      }
    case FAIL_AUTH:
      return {
        ...state,
        isAuthenticated: false,
        authError: action.payload
      }
    case REGISTER_USER:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        authError: ''
      }
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        userProfileLoading: false
      }
    case SUCCESS_LOAD_USER:
      return {
        ...state,
        isAuthenticated: true
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