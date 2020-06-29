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

  if (signUpForm) {
    return (
      <div className="container">
        <Fragment>
          <button 
            className="right btn blue-grey darken-4"
            onClick={changeForm}
          >
            <i className="material-icons">how_to_reg</i> Already have account?
          </button>
          <h3>Sign up</h3>
          <div className="divider"></div>
          <SignUp history={history} />
        </Fragment>
      </div>
    )
  }

  return (
    <div className="container">
      <Fragment>
          <button 
            className="right btn blue-grey darken-4"
            onClick={changeForm}
          >
            <i className="material-icons">account_circle</i> Don't have account?
          </button>
        <h3>Sign in</h3>
        <div className="divider"></div>
        <SignIn history={history} />
      </Fragment>
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
