import React, { Fragment, useState, useEffect } from 'react'
import SignUp from '../components/Auth/SignUp';
import SignIn from '../components/Auth/SignIn';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Authorization = (props) => {
  const [ signUpForm, setSignUpForm ] = useState(true);

  const {
    user: {
      isAuthenticated,
      authError,
    },
    history
  } = props;

  useEffect(() => {
    if (isAuthenticated) history.push('/profile');
    // eslint-disable-next-line
  }, [isAuthenticated])

  const changeForm = () => {
    setSignUpForm(!signUpForm)
  }

  return (
    <div className="container">
      <button 
        className="right btn blue-grey darken-4"
        onClick={changeForm}
      >
        <i className="material-icons">account_circle</i> 
        {(signUpForm) ? ' Dont have account' : ' Already have account'}
      </button>
      <h3>{(signUpForm) ? 'Sign up' : 'Sign in'}</h3>
      <div className="divider"></div>
      { (signUpForm) ? (<SignUp history={history} />) : (<SignIn history={history} />) }
    </div> 
  )

}

Authorization.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Authorization);
