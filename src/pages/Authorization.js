import React, { Fragment, useState, useEffect } from 'react'
import SignUp from '../components/Auth/SignUp';
import SignIn from '../components/Auth/SignIn';
import { connect } from 'react-redux';
import { loadUser } from '../store/actions/userAction';

const Authorization = ({ user: { isAuthenticated, userProfileLoading }, loadUser, history}) => {
  const [ signForm, setSignForm ] = useState(true);

  useEffect(() => {
    if (isAuthenticated) history.push('/profile');
    // eslint-disable-next-line
  }, [isAuthenticated])

  const changeForm = () => {
    setSignForm(!signForm)
  }

  if (signForm) {
    return (
      <div className="container">
        <Fragment>
          <button 
            className="right btn blue-grey darken-4"
            onClick={changeForm}
          >
            Already have account?
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
            Don't have account?
          </button>
        <h3>Sign in</h3>
        <div className="divider"></div>
        <SignIn history={history} />
      </Fragment>
    </div> 
  )

}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {loadUser})(Authorization);
