import React, { useState, useEffect, useCallback } from 'react'
import SignUp from '../components/Auth/SignUp';
import SignIn from '../components/Auth/SignIn';
import { connect } from 'react-redux';
import {clearAuthError} from '../store/actions/userAction';
import PropTypes from 'prop-types';

const Authorization = (props) => {
  const [ signUpForm, setSignUpForm ] = useState(true);
  const {
    user: {
      isAuthenticated,
      authError,
    },
    clearAuthError,
    history
  } = props;

  useEffect(() => {
    if (isAuthenticated) history.push('/');
    // eslint-disable-next-line
  }, [isAuthenticated])

  const changeForm = useCallback(() => {
    setSignUpForm(!signUpForm)
    clearAuthError();
    // eslint-disable-next-line
  }, [signUpForm])

  return (
    <div className="container">
      <button 
        className="right btn blue-grey darken-4"
        onClick={changeForm}
      >
        <i className="material-icons">account_circle</i> 
        {(signUpForm) ? ' Already have account' : ' Dont have account'}
      </button>
      <h3>{(signUpForm) ? 'Sign up' : 'Sign in'}</h3>
      <div className="divider"></div>
      { (signUpForm) ? (<SignUp history={history} />) : (<SignIn history={history} />) }
      { authError.length > 0 && (
        <div className="left-align">
          <i className="material-icons">error</i> {authError}
        </div>
      )}
    </div> 
  )

}

Authorization.propTypes = {
  user: PropTypes.object.isRequired,
  clearAuthError: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { 
  clearAuthError 
})(Authorization);
