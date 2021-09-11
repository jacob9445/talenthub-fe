import React, { useCallback } from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import Widget from 'components/Widget'
import TeamEditForm, { validationSchema } from 'routes/Admin/routes/Team/TeamEditForm'
import { formSubmit } from 'helpers/form'
import { createTeamAndRefresh } from 'store/modules/team'

const initialValues = {
  name: ''
}

const TeamNew = ({ createTeamAndRefresh, history }) => {
  const handleSubmit = useCallback(
    (payload, formActions) => {
      payload = { ...payload }
      return formSubmit(
        createTeamAndRefresh,
        {
          data: payload,
          success: () => history.push(`/admin/teams`)
        },
        formActions
      )
    },
    [createTeamAndRefresh, history]
  )

  return (
    <Widget title="Create Team" disableWidgetMenu>
      <Formik
        component={TeamEditForm}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      />
    </Widget>
  )
}

const actions = {
  createTeamAndRefresh
}

TeamNew.propTypes = {
  createTeam: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(withRouter, connect(null, actions))(TeamNew)
