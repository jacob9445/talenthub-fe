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
import FormSelect from 'components/FormSelect'
import useStyles from './styles'
import { getTeams, teamsSelector } from 'store/modules/team'
import Spinner from 'components/Spinner'

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

const UserDetailForm = ({ match: { path }, location, history, handleSubmit, teams, getTeams }) => {
  const classes = useStyles()

  useEffect(() => {
    getTeams()
  }, [getTeams])

  const options = useMemo(
    () =>
      typeof teams !== 'undefined' &&
      teams.map(team => ({
        value: team.id,
        display: team.name
      })),
    [teams]
  )

  const isEdit = useMemo(() => path.includes('detail'), [path])

  const handleCancel = useCallback(() => {
    location.state ? history.push(location.state) : history.push('/admin/users')
  }, [location, history])

  if (!teams) return <Spinner />
  else
    return (
      <form onSubmit={handleSubmit}>
        <Field component={FormInput} htmlId="first_name" type="text" name="first_name" label="First Name" />
        <Field component={FormInput} htmlId="last_name" type="text" name="last_name" label="Last Name" />
        <Field component={FormInput} htmlId="email" type="email" name="email" label="Email" />
        {!isEdit && (
          <React.Fragment>
            <Field component={FormInput} htmlId="password" type="password" name="password" label="Password" />
            <Field
              component={FormInput}
              htmlId="confirm_password"
              type="password"
              name="confirm_password"
              label="Confirm password"
            />
          </React.Fragment>
        )}
        <Field component={FormSelect} htmlId="team" name="team" label="Team" options={options} />
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
  teams: teamsSelector
})

UserDetailForm.propTypes = {
  path: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  teams: PropTypes.array
}

export default R.compose(
  connect(
    selectors,
    actions
  ),
  withRouter
)(UserDetailForm)
