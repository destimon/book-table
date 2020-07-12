import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { signInUserAsync } from '../../store/actions/userAction'
import PropTypes from 'prop-types'
import { Formik } from 'formik';

const SignIn = (props) => {
  const {
    user: {
      isAuthenticated,
    },
    signInUserAsync,
    history
  } = props;

  // Validate sign in form
  const validateForm = useCallback((values) => {
    const errors = {};
    if (!values.username) {
      errors.username = '* Username required';
    } else if (values.username.length > 15) {
      errors.username = '* Username too long, 15 symbols maximum';
    }

    if (!values.password) {
      errors.password = '* Password required';
    }
    return errors;
  }, [])

  // Submit sign in form
  const submitForm = useCallback(async (values, { setSubmitting }) => {
    await signInUserAsync({
      username: values.username,
      password: values.password
    });
    setSubmitting(false);
    (isAuthenticated) ? history.push('/') : history.push('/auth');
  }, [isAuthenticated, history, signInUserAsync])

  return (
    <Formik
      initialValues={{ 
        username: '', 
        password: '' 
      }}
      validate={ validateForm }
      onSubmit={ submitForm }
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
            </form>
          </div>
        </div>
      )}
    </Formik>
  )
}

SignIn.propTypes = {
  signInUserAsync: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
  
const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps, { signInUserAsync })(SignIn);