import React from 'react'
import { withRouter } from 'react-router'
import { Button } from '@material-ui/core'
import { Field } from 'formik'
import PropTypes from 'prop-types'

import FormInput from 'components/FormInput'
import useStyles from './styles'

const MyDetailForm = ({ match: { path }, handleSubmit }) => {
  const classes = useStyles()
  return (
    <form onSubmit={handleSubmit}>
      <Field component={FormInput} htmlId="first_name" type="text" name="first_name" label="First Name" />
      <Field component={FormInput} htmlId="last_name" type="text" name="last_name" label="Last Name" />
      <Field component={FormInput} htmlId="email" type="email" name="email" label="Email" />
      <div className={classes.buttonWraper}>
        <Button variant="text" color="primary">
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
export default withRouter(MyDetailForm)
