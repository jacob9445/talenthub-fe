import React, { useCallback } from 'react'
import { Field } from 'formik'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import FormInput from 'components/FormInput'
import FormSelect from 'components/FormSelect'
import useStyles from './styles'
import { platformOptions } from 'config/constants'

export const validationSchema = Yup.object().shape({
  profile: Yup.string().required('This field is required!'),
  platform_type: Yup.string().required('This field is required!'),
  email: Yup.string().required('This field is required!'),
  password: Yup.string().required('This field is required!'),
  location: Yup.string().required('This field is required!'),
  recovery_email: Yup.string().required('This field is required!'),
  url: Yup.string().required('This field is required!')
})

const AccountDetailForm = ({ location, history, handleSubmit }) => {
  const classes = useStyles()

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push('/admin/accounts')
  }, [location, history])

  return (
    <form onSubmit={handleSubmit}>
      <Field component={FormInput} htmlId="profile" type="text" name="profile" label="Profile" readOnly={true} />
      <Field
        component={FormSelect}
        htmlId="platform_type"
        type="text"
        name="platform_type"
        label="Platform Type"
        options={platformOptions}
      />
      <Field component={FormInput} htmlId="email" type="email" name="email" label="Email" />
      <Field component={FormInput} htmlId="password" type="text" name="password" label="Password" />
      <Field component={FormInput} htmlId="location" type="text" name="location" label="Location" />
      <Field component={FormInput} htmlId="recovery_email" type="text" name="recovery_email" label="Recovery Email" />
      <Field component={FormInput} htmlId="url" type="text" name="url" label="URL" />
      <div className={classes.formButtonWrapper}>
        <Button type="submit" variant="contained" color="primary" className={classes.formButton}>
          Update
        </Button>
        <Button variant="contained" color="secondary" className={classes.formButton} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

AccountDetailForm.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default withRouter(AccountDetailForm)
