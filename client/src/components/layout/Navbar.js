import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = (props) => {
  const {
    user: { userProfileLoading, isAuthenticated },
  } = props;

  return (
    <nav
      className="blue-grey darken-4"
      style={{ marginBottom: "5%", paddingLeft: "3%", paddingRight: "3%" }}
    >
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          BookTable
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            {!userProfileLoading && (
              <Link to={isAuthenticated ? "/profile" : "/auth"}>
                {isAuthenticated ? "Profile" : "Sign up"}
              </Link>
            )}
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(Navbar);
