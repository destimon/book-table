import React from 'react'
import { Link } from 'react-router-dom'
// import '../../assets/main.scss';

const Navbar = () => {
  return (
    <nav className="blue-grey darken-4" style={{marginBottom: '5%', paddingLeft: '3%', paddingRight: '3%'}}>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo"><i className="material-icons">book</i>BookTable</Link>
        <ul id="nav-mobile" className="right">
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
