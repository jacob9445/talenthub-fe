import React, { useCallback, useEffect, useMemo } from 'react'
import { Field } from 'formik'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import FormInput from 'components/FormInput'
import FormEditableSelect from 'components/FormEditableSelect'
import FormSelect from 'components/FormSelect'
import useStyles from './styles'
import { getUsers, usersSelector, usersLoadingSelector } from 'store/modules/user'
import { meSelector } from 'store/modules/auth'
import Spinner from 'components/Spinner'
import { profileTypeOptions, genderOptions, URL_PREFIXES, ROLES } from 'config/constants'

export const validationSchema = Yup.object().shape({
  profile_type: Yup.string().required('This field is required!'),
  first_name: Yup.string().required('This field is required!'),
  last_name: Yup.string().required('This field is required!'),
  address: Yup.string().required('This field is required!'),
  country: Yup.string().required('This field is required!'),
  gender: Yup.string().required('This field is required!'),
  dob: Yup.date().required('This field is required!')
})

const validateOwnerField = (value, role) =>
  role !== ROLES.DEVELOPER ? (!value ? 'This field is required!' : undefined) : undefined

const ProfileDetailForm = ({
  location,
  history,
  handleSubmit,
  getUsers,
  users,
  isUsersLoading,
  me,
  match: { params }
}) => {
  const isUpdateMode = Boolean(params.id)
  const classes = useStyles()

  useEffect(() => {
    if (me.role !== ROLES.DEVELOPER) {
      !users && getUsers(me)
    }
  }, [getUsers, users, me])

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/profiles`)
  }, [location, history, me.role])

  const userOptions = useMemo(() => {
    if (users) {
      return users.results.map(user => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user.id
      }))
    } else {
      return []
    }
  }, [users])

  if (isUsersLoading || (!userOptions.length && me.role !== ROLES.DEVELOPER)) return <Spinner />
  else
    return (
      <form onSubmit={handleSubmit}>
        {me.role !== ROLES.DEVELOPER ? (
          <Field
            component={FormEditableSelect}
            htmlId="user_id"
            type="text"
            name="user_id"
            label="Owner"
            options={userOptions}
            validate={value => validateOwnerField(value, me.role)}
          />
        ) : null}
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
        <Field component={FormInput} htmlId="dob" type="date" name="dob" label="Data of Birth" />
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
        <Field
          component={FormInput}
          htmlId="extra_info"
          type="text"
          name="extra_info"
          label="Extra Information"
          extra={{
            multiline: true,
            rows: 5,
            placeholder: 'ID Number, Bank account number, Tax ID, Teamviewer / Anydesk ...'
          }}
        />
        <div className={classes.formButtonWrapper}>
          <Button type="submit" variant="contained" color="primary" className={classes.formButton}>
            {isUpdateMode ? 'Update' : 'Create'}
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
  isUsersLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
}

export default R.compose(withRouter, connect(selectors, actions))(ProfileDetailForm)
