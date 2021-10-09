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
import useStyles from './styles'
import { getTeams, teamsSelector } from 'store/modules/team'
import { meSelector } from 'store/modules/auth/selectors'
import Spinner from 'components/Spinner'
import FormSelect from 'components/FormSelect'
import { ROLE_OPTIONS, ROLES } from 'config/constants'

export const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  team: '',
  role: ROLES.DEVELOPER
}

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('This field is required!'),
  last_name: Yup.string().required('This field is required!'),
  email: Yup.string().required('This field is required!'),
  team: Yup.number().required('This field is required!')
})

export const validatePwds = values => {
  if (values.password !== values.confirm_password) {
    return {
      confirm_password: 'Confirm Password does not match with password.'
    }
  }
}

const UserDetailForm = ({ match: { path }, location, history, handleSubmit, teams, getTeams, me }) => {
  const classes = useStyles()

  useEffect(() => {
    if (me.role === ROLES.ADMIN) getTeams()
  }, [getTeams, me])

  const teamOptions = useMemo(
    () =>
      typeof teams !== 'undefined'
        ? teams.map(team => ({
            value: team.id,
            label: team.name
          }))
        : [],
    [teams]
  )

  const isEdit = useMemo(() => path.includes('detail'), [path])

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push('/admin/users')
  }, [location, history])

  if (me.role === ROLES.ADMIN && !teams) return <Spinner />
  else
    return (
      <form onSubmit={handleSubmit}>
        <Field component={FormInput} htmlId="first_name" type="text" name="first_name" label="First Name" />
        <Field component={FormInput} htmlId="last_name" type="text" name="last_name" label="Last Name" />
        <Field component={FormInput} htmlId="email" type="email" name="email" label="Email" />
        {me.role === ROLES.ADMIN && (
          <>
            <Field component={FormSelect} htmlId="role" name="role" label="Role" options={ROLE_OPTIONS} />
            <Field component={FormEditableSelect} htmlId="team" name="team" label="Team" options={teamOptions} />
          </>
        )}
        {!isEdit && (
          <>
            <Field component={FormInput} htmlId="password" type="password" name="password" label="Password" />
            <Field
              component={FormInput}
              htmlId="confirm_password"
              type="password"
              name="confirm_password"
              label="Confirm password"
            />
          </>
        )}
        <div className={classes.formButtonWrapper}>
          <Button type="submit" variant="contained" color="primary" className={classes.formButton}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button variant="contained" color="secondary" className={classes.formButton} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    )
}

const actions = {
  getTeams
}

const selectors = createStructuredSelector({
  teams: teamsSelector,
  me: meSelector
})

UserDetailForm.propTypes = {
  path: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  teams: PropTypes.array
}

export default R.compose(connect(selectors, actions), withRouter)(UserDetailForm)
