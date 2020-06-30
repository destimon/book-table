import React from 'react';
import {connect} from 'react-redux';
import { registerUser } from '../../store/actions/userAction'
import PropTypes from 'prop-types'
import { Formik } from 'formik';

const SignUp = (props) => {
  const {
    user: {
      isAuthenticated,
    },
    history, 
    registerUser,
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
    } else if (values.password.length < 6) {
      errors.password = '* Password too short, 6 symbols minimum';
    }
    return errors;
  }


  const submitForm = (values, { setSubmitting }) => {
    registerUser({
      username: values.username,
      password: values.password,
      bio: values.bio,
    });
    setSubmitting(false);
    (isAuthenticated) ? history.push('/') : history.push('/auth');
  }

  return (
    <Formik
      initialValues={{ username: '', password: '', bio: '' }}
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
              <div className="input-field">
                <input
                  id="bio" 
                  type='text'
                  name='bio'
                  className="validate"
                  value={values.bio}
                  onChange={handleChange}
                />
                <label htmlFor="bio">Bio</label>
              </div>
              <input
                value="Sign up" 
                type='submit'
                className="right btn blue-grey darken-4"
                disabled={isSubmitting}
              />
            </form>
          </div>
        </div>
      )}
    </Formik>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { registerUser })(SignUp);