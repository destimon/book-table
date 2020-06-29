import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ user, component: Component, ...rest }) => {
  const { isAuthenticated, userProfileLoading } = user;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !userProfileLoading ? (
          <Redirect to='/auth' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(PrivateRoute);