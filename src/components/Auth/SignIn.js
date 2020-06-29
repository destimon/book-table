import React, { useState } from 'react';
import {connect} from 'react-redux';
import { signInUser } from '../../store/actions/userAction'
import PropTypes from 'prop-types'

const SignIn = ({ signInUser, history }) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = e => {
    e.preventDefault()
    signInUser(user);
    history.push('/');
  }

  return (
    <div className="row">
      <div className="col l6">
        <form className="left-align" onSubmit={handleSubmit}>
          <div className="input-field">
            <input 
              id="username" 
              type="text" 
              name="username"
              className="validate"
              value={user.username}
              onChange={handleChange}
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="input-field">
            <input
              id="password" 
              type='password'
              name='password'
              className="validate"
              value={user.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <input className="right btn blue-grey darken-4" value="Sign in" type='submit'/>
        </form>
      </div>
    </div>
  )
}

SignIn.propTypes = {
  signInUser: PropTypes.func.isRequired,
}

export default connect(null, { signInUser })(SignIn);