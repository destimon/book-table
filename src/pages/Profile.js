import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions/userAction';
import Preloader from '../components/layout/Preloader';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const {
    user: {
      user,
      isAuthenticated,
      userProfileLoading
    },
    logoutUser,
    history
  } = props;

  useEffect(() => {
    if (!isAuthenticated && !userProfileLoading) history.push('/auth');
    // eslint-disable-next-line
  }, [isAuthenticated])

  const clickLogout = () => {
    logoutUser();
    history.push('/auth');
  }

  if (userProfileLoading) {
    return <Preloader />
  } 

  return (
    <div className="row">
      <div className="container">
        <div className="col l3">
          <img alt="avatar" className="avatar" src="/default_avatar.png"></img>
        </div>
        <div className="col l9">
          <h4>{user.username}</h4>
          <p>{user.bio}</p>
          <button 
            className="btn blue-grey darken-4"
            onClick={clickLogout}
          >
            <i className="material-icons">exit_to_app</i> Logout
          </button>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, {
  logoutUser 
})(Profile);
