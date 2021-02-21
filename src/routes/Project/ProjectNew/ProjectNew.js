import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import ProjectDetailForm, { validationSchema } from '../ProjectDetailForm'
import { formSubmit } from 'helpers/form'
import { createProject } from 'store/modules/project'
import { meSelector } from 'store/modules/auth'
import { ROLES, PROJECT_STATUS, PROJECT_TYPE, URL_PREFIXES } from 'config/constants'

const initialValues = {
  title: '',
  type: PROJECT_TYPE.HOULYFT,
  weakly_limit: '',
  price: '',
  started_at: '',
  ended_at: '',
  status: PROJECT_STATUS.ONGOING,
  client: '',
  project_starter: ''
}

const ProjectNew = ({ createProject, me, history }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createProject,
        {
          data: {
            ...values,
            ended_at:
              values.type === PROJECT_TYPE.BUDGET || values.status === PROJECT_STATUS.ENDED ? values.ended_at : null,
            weakly_limit: values.type !== PROJECT_TYPE.BUDGET ? values.weakly_limit : null,
            ...(me.role === ROLES.DEVELOPER
              ? {
                  project_starter: me.id,
                  participants: [me.id]
                }
              : {
                  participants: [values.project_starter]
                })
          },
          success: () => history.push(`/${URL_PREFIXES[me.role]}/projects`)
        },
        formActions
      )
    },
    [createProject, me, history]
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget title="Create Project" disableWidgetMenu>
          <Formik
            component={ProjectDetailForm}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          />
        </Widget>
      </Grid>
    </Grid>
  )
}

const selector = createStructuredSelector({
  me: meSelector
})

const actions = {
  createProject
}

ProjectNew.propTypes = {
  createProject: PropTypes.func.isRequired,
  me: PropTypes.object
}

export default compose(
  withRouter,
  connect(
    selector,
    actions
  )
)(ProjectNew)
