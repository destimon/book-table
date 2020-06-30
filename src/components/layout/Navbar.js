import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const Navbar = (props) => {
  const {
    user: {
      userProfileLoading,
      isAuthenticated
    }
  } = props;

  return (
    <nav className="blue-grey darken-4" style={{marginBottom: '5%', paddingLeft: '3%', paddingRight: '3%'}}>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">BookTable</Link>
        <ul id="nav-mobile" className="right">
          <li>
            {
              !userProfileLoading && (
                <Link to="/profile">
                { (isAuthenticated) ? ( 'Profile' ) : 'Sign up' }
                </Link>
              )
            }

          </li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Navbar)
