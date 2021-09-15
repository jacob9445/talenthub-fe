import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Field } from 'formik'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button } from '@material-ui/core'

import useStyles from './styles'
import FormPasswordInput from 'components/FormPasswordInput'
import { URL_PREFIXES } from 'config/constants'
import { meSelector } from 'store/modules/auth'

const ChangePasswordForm = ({ match: { url }, me, handleSubmit, location, history }) => {
  const classes = useStyles()

  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/settings/me`)
  }, [location, history, me.role])

  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={FormPasswordInput}
        htmlId="current_password"
        name="current_password"
        label="Your Current Password"
      />
      <Field component={FormPasswordInput} htmlId="new_password" name="new_password" label="New Password" />
      <Field component={FormPasswordInput} htmlId="confirm_password" name="confirm_password" label="Confirm Password" />
      <div className={classes.buttonWraper}>
        <Button className={classes.saveButton} type="submit" variant="contained" color="primary">
          Update Password
        </Button>
        <Button variant="contained" color="secondary" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </form>
  )
}

ChangePasswordForm.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  me: PropTypes.object.isRequired
}

const selector = createStructuredSelector({
  me: meSelector
})

export default compose(withRouter, connect(selector))(ChangePasswordForm)
