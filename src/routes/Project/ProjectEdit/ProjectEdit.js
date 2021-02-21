import React, { useEffect, useCallback, useMemo } from 'react'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import { formSubmit } from 'helpers/form'
import ProjectDetailForm, { validationSchema } from '../ProjectDetailForm'
import {
  getProjectDetail,
  updateProjectDetail,
  projectDetailSelector,
  projectDetailLoadingSelector
} from 'store/modules/project'
import Spinner from 'components/Spinner'
import { meSelector } from 'store/modules/auth'
import { ROLES, PROJECT_TYPE, PROJECT_STATUS, URL_PREFIXES } from 'config/constants'

const ProjectEdit = ({
  getProjectDetail,
  updateProjectDetail,
  projectDetail,
  isDetailLoading,
  match: { params },
  me,
  history
}) => {
  useEffect(() => {
    getProjectDetail(params.id)
  }, [getProjectDetail, params])

  const initialValues = useMemo(
    () => ({
      title: projectDetail?.title || '',
      type: projectDetail?.type || '',
      weakly_limit: projectDetail?.weakly_limit || '',
      price: projectDetail?.price || '',
      started_at: projectDetail?.started_at || '',
      ended_at: projectDetail?.ended_at || '',
      status: projectDetail?.status || '',
      client: projectDetail?.client || '',
      project_starter: projectDetail?.project_starter || ''
    }),
    [projectDetail]
  )

  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        updateProjectDetail,
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
          id: params.id,
          success: () => history.push(`/${URL_PREFIXES[me.role]}/projects`)
        },
        formActions
      )
    },
    [updateProjectDetail, params.id, me, history]
  )

  if (isDetailLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Project Detail" disableWidgetMenu>
            <Formik
              component={ProjectDetailForm}
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={handleSubmit}></Formik>
          </Widget>
        </Grid>
      </Grid>
    )
}

const actions = {
  getProjectDetail,
  updateProjectDetail
}

const selectors = createStructuredSelector({
  projectDetail: projectDetailSelector,
  isDetailLoading: projectDetailLoadingSelector,
  me: meSelector
})

ProjectEdit.propTypes = {
  getProjectDetail: PropTypes.func.isRequired,
  updateProjectDetail: PropTypes.func.isRequired,
  projectDetail: PropTypes.object,
  isDetailLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  me: PropTypes.object
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions
  )
)(ProjectEdit)
