import React, { useEffect, useCallback, useMemo } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { pick, get } from 'lodash'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import { formSubmit } from 'helpers/form'
import { getTeamDetail, teamDetailSelector, teamDetailLoadingSelector } from 'store/modules/team'
import { updateTeamAndRefresh } from 'store/modules/team'
import TeamEditForm, { validationSchema } from 'routes/Admin/routes/Team/components/TeamEditForm'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'

const TeamEdit = ({ match: { params }, getTeamDetail, teamDetail, updateTeamAndRefresh, history }) => {
  useEffect(() => {
    getTeamDetail(params.id)
  }, [params, getTeamDetail])

  const initialValues = useMemo(() => {
    return !teamDetail
      ? {
          name: ''
        }
      : {
          ...pick(teamDetail, ['name']),
          team: get(teamDetail, 'team.id')
        }
  }, [teamDetail])

  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        updateTeamAndRefresh,
        {
          data: payload,
          id: params.id,
          success: () => history.push('/admin/teams')
        },
        formActions
      )
    },
    [updateTeamAndRefresh, params.id, history]
  )

  if (!teamDetail) return <Spinner />
  else
    return (
      <Widget title="Team Details" disableWidgetMenu>
        <Formik
          component={TeamEditForm}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
        />
      </Widget>
    )
}

const selectors = createStructuredSelector({
  teamDetail: teamDetailSelector,
  loadingSelectedTeam: teamDetailLoadingSelector
})
const actions = {
  getTeamDetail,
  updateTeamAndRefresh
}

TeamEdit.propTypes = {
  params: PropTypes.object,
  teamDetail: PropTypes.object,
  getTeamDetail: PropTypes.func.isRequired,
  updateTeamAndRefresh: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default compose(connect(selectors, actions), withRouter)(TeamEdit)
