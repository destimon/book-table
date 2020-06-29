import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { loadUser } from '../../store/actions/userAction';

const Navbar = ({ user: { user }, loadUser }) => {
  useEffect(() => {
    // loadUser();
    // eslint-disable-next-line
  }, [])

  return (
    <nav className="blue-grey darken-4" style={{marginBottom: '5%', paddingLeft: '3%', paddingRight: '3%'}}>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">BookTable</Link>
        <ul id="nav-mobile" className="right">
          <li><Link to="/profile">
            { 'Profile' }
          </Link></li>
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

export default connect(mapStateToProps, { loadUser })(Navbar)
