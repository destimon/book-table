import {
  SET_USER_AUTH_POST
} from '../actions/types';

const bookInitialState = {
  user: null
}

export const bookReducer = (state = bookInitialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH_POST:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}