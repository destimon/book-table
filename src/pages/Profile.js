import React, { useEffect } from 'react'
import SignUp from '../components/Auth/SignUp'
import { connect } from 'react-redux';
import { loadUser, logoutUser } from '../store/actions/userAction';
import Preloader from '../components/layout/Preloader';

const Profile = (props) => {
  const {
    user: {
      user,
      userProfileLoading
    },
    loadUser,
    logoutUser
  } = props;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [])

  if (userProfileLoading) {
    return <Preloader />
  } else {
    return (
      (user) ? 
      (
        <div className="row">
          <div className="container">
            <div className="col l4">
              <h3>Profile</h3>
              <p>Username: {user.username}</p>
              <button 
                className="btn blue-grey darken-4"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) 
      :
      ( <SignUp /> )
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, { 
  loadUser, 
  logoutUser 
})(Profile);
