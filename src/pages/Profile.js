import React, { useEffect } from 'react'
import SignUp from '../components/Auth/SignUp'
import { connect } from 'react-redux';
import { loadUser } from '../store/actions/userAction';
import Preloader from '../components/layout/Preloader';

const Profile = ({ user: { user, userProfileLoading }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [])

  if (userProfileLoading) {
    return <Preloader />
  } else {
    return (
      (user) ? 
      (
        <div className="row">
          <div className="container">
            <h3>Profile</h3>
            <div className="col l4">
              <p>Username: {user.username}</p>
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

export default connect(mapStateToProps, { loadUser })(Profile);
