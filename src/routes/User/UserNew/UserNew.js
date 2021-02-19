import React, { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import Widget from 'components/Widget'
import UserDetailForm, { validationSchema, validatePwds } from 'routes/User/UserDetailForm'
import { formSubmit } from 'helpers/form'
import { createUser } from 'store/modules/user'
import { roleSelector } from 'store/modules/auth'
import { getTeams, teamsSelector } from 'store/modules/team'
import { URL_PREFIXES } from 'config/constants'

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  team: ''
}

const UserNew = ({ createUser, getTeams, teams, history, role }) => {
  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        createUser,
        {
          data: payload,
          success: () => history.push(`/${URL_PREFIXES[role]}/users`)
        },
        formActions
      )
    },
    [createUser, history, role]
  )

  useEffect(() => {
    !teams && getTeams()
  }, [getTeams, teams])

  return (
    <div>
      <Widget title="Create User" disableWidgetMenu>
        <Formik
          component={UserDetailForm}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validate={validatePwds}
        />
      </Widget>
    </div>
  )
}

const selectors = createStructuredSelector({
  teams: teamsSelector,
  role: roleSelector
})

const actions = {
  createUser,
  getTeams
}

UserNew.propTypes = {
  createUser: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  teams: PropTypes.array,
  role: PropTypes.object
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions
  )
)(UserNew)
