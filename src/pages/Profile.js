import React, { useEffect } from 'react'
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
    logoutUser,
    history
  } = props;

  useEffect(() => {
    loadUser();
    console.log(user)
    if (!user) history.push('/auth');
    // eslint-disable-next-line
  }, [])

  const clickLogout = () => {
    logoutUser();
    history.push('/auth');
  }

  if (userProfileLoading || !user) {
    return <Preloader />
  } else {
    return (
      <div className="row">
        <div className="container">
          <div className="col l4">
            <h3>Profile</h3>
            <p>Username: {user.username}</p>
            <button 
              className="btn blue-grey darken-4"
              onClick={clickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
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
