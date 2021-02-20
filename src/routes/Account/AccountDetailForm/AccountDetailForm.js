import React, { useCallback, useEffect, useMemo } from 'react'
import { Field } from 'formik'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import FormInput from 'components/FormInput'
import FormSelect from 'components/FormSelect'
import useStyles from './styles'
import { platformOptions } from 'config/constants'
import { getProfiles, profileSelector } from 'store/modules/profile'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

export const validationSchema = Yup.object().shape({
  profile: Yup.string().required('This field is required!'),
  platform_type: Yup.string().required('This field is required!'),
  email: Yup.string().required('This field is required!'),
  password: Yup.string().required('This field is required!'),
  location: Yup.string().required('This field is required!'),
  recovery_email: Yup.string().required('This field is required!'),
  url: Yup.string().required('This field is required!')
})

const AccountDetailForm = ({ getProfiles, profiles, location, history, handleSubmit, me }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  const classes = useStyles()

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/accounts`)
  }, [location, history, me.role])

  const profileOptions = useMemo(
    () =>
      profiles
        ? profiles.map(profile => ({
            value: profile.id,
            display: `${profile.first_name} ${profile.last_name}`
          }))
        : [],
    [profiles]
  )

  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={FormSelect}
        htmlId="profile"
        type="text"
        name="profile"
        label="Profile"
        options={profileOptions}
      />
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
  handleSubmit: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.array,
  me: PropTypes.object
}

const actions = {
  getProfiles
}

const selector = createStructuredSelector({
  profiles: profileSelector,
  me: meSelector
})

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(AccountDetailForm)
