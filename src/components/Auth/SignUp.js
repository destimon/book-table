import React, { useState } from 'react';
import {connect} from 'react-redux';
import { registerUser } from '../../store/actions/userAction'
import PropTypes from 'prop-types'

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    bio: ''
  });

  const {
    history, registerUser
  } = props;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = e => {
    e.preventDefault()
    registerUser(formData);
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
              value={formData.username}
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
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field">
            <input
              id="bio" 
              type='text'
              name='bio'
              className="validate"
              value={formData.bio}
              onChange={handleChange}
            />
            <label htmlFor="bio">Bio</label>
          </div>
          <input className="right btn blue-grey darken-4" value="Sign up" type='submit'/>
        </form>
      </div>
    </div>
  )
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(SignUp);