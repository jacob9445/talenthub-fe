import React from 'react'
import { Field } from 'formik'
import { Snackbar, Typography, Button } from '@material-ui/core'

import FormInput from 'components/FormInput'
import useStyles from '../styles'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, errors }) => {
  let classes = useStyles()
  return (
    <>
      <Typography variant="h1" className={classes.greeting}>
        Sign in to Talents Hub
      </Typography>
      <Snackbar
        open={Boolean(errors._error)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={errors._error}
        ContentProps={{ variant: 'h6' }}
      />

      <form onSubmit={handleSubmit}>
        <Field component={FormInput} htmlId="email" type="email" name="email" label="Email Address" />
        <Field component={FormInput} htmlId="password" type="password" name="password" label="Password" />
        <div className={classes.formButtons}>
          <Button color="primary" size="large" type="submit">
            Login
          </Button>
          <Button color="primary" size="large" className={classes.forgetButton}>
            Forget Password
          </Button>
        </div>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
