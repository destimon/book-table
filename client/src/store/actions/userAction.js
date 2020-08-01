import {
  LOAD_USER,
  SET_USER_PROFILE_LOADING,
  SUCCESS_LOAD_USER,
  FAILURE_LOAD_USER,
  SIGN_IN_USER,
  SIGN_UP_USER,
  CLEAR_AUTH_ERROR,
  SET_AUTH_USER_LOADING,
  SUCCESS_AUTH_USER,
  FAILURE_AUTH_USER,
  LOGOUT_USER,
} from "./types";
import {
  LOAD_USER_ASYNC,
  SIGN_IN_USER_ASYNC,
  SIGN_UP_USER_ASYNC,
} from "../sagas/sagaTypes";

// Authorization (signup/signin)
export const setAuthUserLoading = () => ({ type: SET_AUTH_USER_LOADING });
export const successAuthUser = (token) => ({
  type: SUCCESS_AUTH_USER,
  payload: token,
});
export const failureAuthUser = (authError) => ({
  type: FAILURE_AUTH_USER,
  payload: authError,
});

// Sign up new user profile
export const signUpUser = () => ({ type: SIGN_UP_USER });
export const signUpUserAsync = (formData) => ({
  type: SIGN_UP_USER_ASYNC,
  payload: formData,
});

// Sign in to user's profile
export const signInUser = () => ({ type: SIGN_IN_USER });
export const signInUserAsync = (formData) => ({
  type: SIGN_IN_USER_ASYNC,
  payload: formData,
});

// Load information about logged user
export const loadUser = (userData) => ({ type: LOAD_USER, payload: userData });
export const loadUserAsync = () => ({ type: LOAD_USER_ASYNC });
export const successLoadUser = () => ({ type: SUCCESS_LOAD_USER });
export const failureLoadUser = () => ({ type: FAILURE_LOAD_USER });
export const setUserProfileLoading = () => ({ type: SET_USER_PROFILE_LOADING });

// Authorization clear error message
export const clearAuthError = () => ({ type: CLEAR_AUTH_ERROR });

// Logout current user
export const logoutUser = () => ({ type: LOGOUT_USER });
