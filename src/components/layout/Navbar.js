import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const Navbar = () => {
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

export default connect(mapStateToProps)(Navbar)
