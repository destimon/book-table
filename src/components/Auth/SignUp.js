import React, { useState } from 'react';
import {connect} from 'react-redux';
import { registerUser } from '../../store/actions/userAction'

const SignUp = ({ registerUser }) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    bio: ''
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = e => {
    e.preventDefault()
    registerUser(user);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col l6">
          <form className="left-align" onSubmit={handleSubmit}>
            <div className="input-field">
              <input 
                placeholder="Username" 
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
                placeholder='Password'
                id="password" 
                type='password'
                name='password'
                className="validate"
                value={user.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <input className="btn" value="Sign up" type='submit'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default connect(null, { registerUser })(SignUp);