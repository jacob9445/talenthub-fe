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
import PlatformDetailForm, { validationSchema } from '../../components/PlatformDetailForm'
import {
  getPlatformDetail,
  updatePlatform,
  platformDetailSelector,
  platformDetailLoadingSelector
} from 'store/modules/platform'
import Spinner from 'components/Spinner'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const PlatformEdit = ({
  getPlatformDetail,
  updatePlatform,
  platformDetail,
  isDetailLoading,
  match: { params },
  me,
  history
}) => {
  useEffect(() => {
    getPlatformDetail(params.id)
  }, [getPlatformDetail, params])

  const initialValues = useMemo(
    () => ({
      name: platformDetail?.name || ''
    }),
    [platformDetail]
  )

  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        updatePlatform,
        {
          data: values,
          id: parseInt(params.id),
          success: () => history.push(`/${URL_PREFIXES[me.role]}/platforms`)
        },
        formActions
      )
    },
    [updatePlatform, me, history, params.id]
  )

  if (isDetailLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Payment Account Detail" disableWidgetMenu>
            <Formik
              component={PlatformDetailForm}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}></Formik>
          </Widget>
        </Grid>
      </Grid>
    )
}

const actions = {
  getPlatformDetail,
  updatePlatform
}

const selectors = createStructuredSelector({
  platformDetail: platformDetailSelector,
  isDetailLoading: platformDetailLoadingSelector,
  me: meSelector
})

PlatformEdit.propTypes = {
  getPlatformDetail: PropTypes.func.isRequired,
  updatePlatform: PropTypes.func.isRequired,
  platformDetail: PropTypes.object,
  isDetailLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  me: PropTypes.object
}

export default compose(withRouter, connect(selectors, actions))(PlatformEdit)
