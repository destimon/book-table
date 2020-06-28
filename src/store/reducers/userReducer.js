import {
  REGISTER_USER,
  LOAD_USER,
  SET_USER_PROFILE_LOADING,
  LOGOUT_USER
} from '../actions/types';

const userInitialState = {
  user: null,
  token: null,
  userProfileLoading: true,
}

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        token: action.payload,
      }
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        userProfileLoading: false,
      }
    case SET_USER_PROFILE_LOADING:
      return {
        ...state,
        userProfileLoading: true,
      }
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
      }
    default:
      return state
  }
}