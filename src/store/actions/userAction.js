import {
  SET_USER_AUTH_POST
} from '../actions/types';
// import axios from 'axios';
// import _ from 'lodash';

export const userAuthPost = (user) => async (dispatch) => (
  fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({user})
  })
  .then(resp => resp.json())
  .then(data => {
    if (data.message) {
      //Тут прописываем логику
    } else {
      localStorage.setItem("token", data.jwt)
      dispatch({
        type: SET_USER_AUTH_POST,
        payload: data.user
      })
    }
  })
)