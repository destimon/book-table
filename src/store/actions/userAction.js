import {
  REGISTER_USER
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

    console.log(res)
    localStorage.setItem("token", res.data.token);
    dispatch({
      type: REGISTER_USER,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
  }
}