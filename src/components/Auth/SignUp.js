import React, { useState } from 'react';
import {connect} from 'react-redux';
import {userPostFetch} from '../redux/actions';

const SignUp = ({ userPostFetch }) => {
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
    userPostFetch(user);
  }

  return (
    <form onSubmit={this.handleSubmit}>
      <h1>Sign Up For An Account</h1>

      <label>Username</label>
      <input
        name='username'
        placeholder='Username'
        value={this.state.username}
        onChange={this.handleChange}
        /><br/>

      <label>Password</label>
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={this.state.password}
        onChange={this.handleChange}
        /><br/>

      <label>Avatar</label>
        <input
          name='avatar'
          placeholder='Avatar (URL)'
          value={this.state.avatar}
          onChange={this.handleChange}
          /><br/>

        <label>Bio</label>
        <textarea
          name='bio'
          placeholder='Bio'
          value={this.state.bio}
          onChange={this.handleChange}
          /><br/>

      <input type='submit'/>
    </form>
  )
}

const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(SignUp);