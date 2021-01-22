import React, { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Widget from 'components/Widget'
import UserDetailForm from 'components/UserDetailForm'
import { formSubmit } from 'helpers/form'
import { createUser } from 'store/modules/users'
import { getTeams, teamsSelector } from 'store/modules/teams'

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  team: ''
}

const CreateUser = ({ createUser, getTeams, teams }) => {
  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        createUser,
        {
          data: payload
        },
        formActions
      )
    },
    [createUser]
  )

  useEffect(() => {
    !teams && getTeams()
  }, [getTeams, teams])

  return (
    <div>
      <Widget title="Create User" disableWidgetMenu>
        <Formik component={UserDetailForm} onSubmit={handleSubmit} initialValues={initialValues} />
      </Widget>
    </div>
  )
}

const selectors = createStructuredSelector({
  teams: teamsSelector
})

const actions = {
  createUser,
  getTeams
}

export default connect(
  selectors,
  actions
)(CreateUser)
