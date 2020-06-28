import React, { useEffect } from 'react'
import SignUp from '../components/Auth/SignUp'
import { connect } from 'react-redux';
import { loadUser } from '../store/actions/userAction';
import Preloader from '../components/layout/Preloader';

const Profile = ({ user: { user, userProfileLoading}, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [])

  if (userProfileLoading) {
    return <Preloader />
  } else {
    return (
      (user) ? (
        <div className="row">
        <div className="container">
          <div className="col l4">
            <h2>{user.username}</h2>
          </div>
          <div className="col l8">
            <h2>Stuff</h2>
          </div>
        </div>
      </div>
      ) 
      :
      (
        <SignUp />
      )
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, { loadUser })(Profile);
