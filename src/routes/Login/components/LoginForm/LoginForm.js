import React, { useEffect } from 'react'
import { Field } from 'formik'
import { Typography, Button } from '@material-ui/core'
import { connect } from 'react-redux'

import FormInput from 'components/FormInput'
import { showMessage } from 'store/modules/message'
import useStyles from './styles'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, errors, showMessage }) => {
  let classes = useStyles()
  useEffect(() => {
    if (errors._error) {
      showMessage({
        message: errors._error,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    }
  }, [showMessage, errors._error])
  return (
    <>
      <Typography variant="h1" className={classes.greeting}>
        Sign in to Talents Hub
      </Typography>

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
  handleSubmit: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired
}

const actions = {
  showMessage
}
export default connect(null, actions)(LoginForm)
