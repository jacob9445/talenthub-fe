import React, { useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { Field } from 'formik'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import FormInput from 'components/FormInput'
import useStyles from './styles'
import { URL_PREFIXES } from 'config/constants'
import { meSelector } from 'store/modules/auth'

const MyDetailForm = ({ match: { url }, handleSubmit, me, history, location }) => {
  const classes = useStyles()

  const handlePasswordClick = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/settings/update-password`)
  }, [location, history, me.role])

  return (
    <form onSubmit={handleSubmit}>
      <Field component={FormInput} htmlId="first_name" type="text" name="first_name" label="First Name" />
      <Field component={FormInput} htmlId="last_name" type="text" name="last_name" label="Last Name" />
      <Field component={FormInput} htmlId="email" type="email" name="email" label="Email" />
      <div className={classes.buttonWraper}>
        <Button variant="text" color="primary" onClick={handlePasswordClick}>
          Change password
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save Settings
        </Button>
      </div>
    </form>
  )
}

MyDetailForm.propTypes = {
  path: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  me: meSelector
})

export default compose(withRouter, connect(selector))(MyDetailForm)
