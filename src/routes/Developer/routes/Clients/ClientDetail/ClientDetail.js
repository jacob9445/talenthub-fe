import React, { useEffect, useCallback, useMemo } from 'react'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import Widget from 'components/Widget'
import { formSubmit } from 'helpers/form'
import ClientDetailForm from '../ClientDetailForm'
import { getClientDetail, updateClient, clientDetailSelector, clientDetailLoadingSelector } from 'store/modules/clients'
import Spinner from 'components/Spinner'
import { CLIENT_TYPES } from 'config/constants'
const ClientDetail = ({ getClientDetail, updateClient, clientDetail, isDetailLoading, match: { params } }) => {
  useEffect(() => {
    getClientDetail(params.id)
  }, [getClientDetail, params.id])

  const initialValues = useMemo(
    () =>
      isDetailLoading
        ? {
            full_name: '',
            type: CLIENT_TYPES.COMPANY,
            company_name: '',
            started_at: ''
          }
        : clientDetail,
    [clientDetail, isDetailLoading]
  )

  if (isDetailLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Client Detail" disableWidgetMenu>
            <Formik component={ClientDetailForm} initialValues={initialValues} enableReinitialize />
          </Widget>
        </Grid>
      </Grid>
    )
}

const actions = {
  getClientDetail,
  updateClient
}

const selectors = createStructuredSelector({
  clientDetail: clientDetailSelector,
  isDetailLoading: clientDetailLoadingSelector
})

export default compose(
  withRouter,
  connect(
    selectors,
    actions
  )
)(ClientDetail)
