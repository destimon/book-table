import React from 'react'
import SignUp from '../components/Auth/SignUp'

const Profile = () => {
  if (true) {
    return (
      <SignUp />
    )
  }

  return (
    <div className="row">
      <div className="container">
        <div className="col l4">
          <h2>Avatar</h2>
        </div>
        <div className="col l8">
          <h2>Stuff</h2>
        </div>
      </div>
    </div>
  )
}

export default Profile
