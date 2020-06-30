import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { signInUser } from '../../store/actions/userAction'
import PropTypes from 'prop-types'
import { Formik } from 'formik';

const SignIn = (props) => {
  const {
    user: {
      isAuthenticated,
      authError
    },
    signInUser,
    history
  } = props;

  const validateForm = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = '* Username required';
    } else if (values.username.length > 15) {
      errors.username = '* Username too long, 15 symbols maximum';
    }

    if (!values.password) {
      errors.password = '* Password required';
    } else if (values.username.length < 6) {
      errors.password = '* Password too short, 6 symbols minimum';
    }
    return errors;
  }

  const submitForm = (values, {setSubmitting}) => {
    signInUser({
      username: values.username,
      password: values.password
    });
    setSubmitting(false);
    (isAuthenticated) ? history.push('/') : history.push('/auth');
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={validateForm}
      onSubmit={submitForm}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="row">
          <div className="col l6">
            <form className="left-align" onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  id="username"
                  type="text"
                  className="validate"
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                />
                <label htmlFor="username">Username</label>
                {errors.username && touched.username && errors.username}
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
                <label htmlFor="password">Password</label>
                {errors.password && touched.password && errors.password}
              </div>
                <input
                  value="Sign in" 
                  type='submit'
                  className="right btn blue-grey darken-4"
                  disabled={isSubmitting}
                />
                { authError.length > 0 && (
                  <Fragment>
                    <i className="material-icons">error</i> {authError}
                  </Fragment>
                )}
            </form>
          </div>
        </div>
      )}
    </Formik>
  )
}

SignIn.propTypes = {
  signInUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { signInUser })(SignIn);