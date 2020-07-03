import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const PrivateRoute = (props) => {
  const {
    user: {
      isAuthenticated,
      userProfileLoading
    },
    component: Component,
    ...rest
  } = props;

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

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(PrivateRoute);