import React, { useCallback, useEffect, useMemo } from 'react'
import { Field } from 'formik'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import * as R from 'ramda'
import PropTypes from 'prop-types'

import FormInput from 'components/FormInput'
import FormSelect from 'components/FormSelect'
import useStyles from './styles'
import { getUsers, usersSelector, usersLoadingSelector } from 'store/modules/users'
import { meSelector } from 'store/modules/auth'
import Spinner from 'components/Spinner'
import { PROFILE_TYPES, GENDER } from 'config/constants'

const profileTypeOptions = [
  {
    display: 'Self',
    value: PROFILE_TYPES.SELF
  },
  {
    display: 'Partner',
    value: PROFILE_TYPES.PARTNER
  }
]

const genderOptions = [
  {
    display: 'Male',
    value: GENDER.MALE
  },
  {
    display: 'Female',
    value: GENDER.FEMALE
  }
]

const ProfileDetailForm = ({ location, history, handleSubmit, getUsers, users, isUsersLoading, me }) => {
  const classes = useStyles()

  useEffect(() => {
    !users && getUsers(me)
  }, [getUsers, users, me])

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push('/admin/profiles')
  }, [location, history])

  const userOptions = useMemo(() => {
    if (users) {
      return users.map(user => ({
        display: user.username,
        value: user.id
      }))
    } else {
      return []
    }
  }, [users])

  if (isUsersLoading || typeof userOptions === 'undefined') return <Spinner />
  else
    return (
      <form onSubmit={handleSubmit}>
        <Field component={FormSelect} htmlId="user_id" type="text" name="user_id" label="Owner" options={userOptions} />
        <Field
          component={FormSelect}
          htmlId="profile_type"
          type="text"
          name="profile_type"
          label="Profile Types"
          options={profileTypeOptions}
        />
        <Field component={FormInput} htmlId="first_name" type="text" name="first_name" label="First Name" />
        <Field component={FormInput} htmlId="last_name" type="text" name="last_name" label="Last Name" />
        <Field component={FormInput} htmlId="address" type="text" name="address" label="Address" />
        <Field component={FormInput} htmlId="country" type="text" name="country" label="Country" />
        <Field
          component={FormSelect}
          htmlId="gender"
          type="text"
          name="gender"
          label="Gender"
          options={genderOptions}
        />
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

const actions = {
  getUsers
}

const selectors = createStructuredSelector({
  users: usersSelector,
  isUsersLoading: usersLoadingSelector,
  me: meSelector
})

ProfileDetailForm.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array,
  me: PropTypes.object.isRequired,
  isUsersLoading: PropTypes.bool.isRequired
}

export default R.compose(
  withRouter,
  connect(
    selectors,
    actions
  )
)(ProfileDetailForm)
