import React, { useEffect, useCallback, useMemo } from 'react'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import Widget from 'components/Widget'
import { formSubmit } from 'helpers/form'
import FinancialRequestDetailForm, { validationSchema } from '../FinancialRequestDetailForm'
import {
  getFinancialRequestDetail,
  updateFinancialRequestDetail,
  financialRequestDetailSelector,
  financialRequestDetailLoadingSelector
} from 'store/modules/financialRequest'
import Spinner from 'components/Spinner'
import { meSelector } from 'store/modules/auth'
import { ROLES, FINANCIALREQUEST_TYPE } from 'config/constants'

const FinancialRequestEdit = ({
  getFinancialRequestDetail,
  updateFinancialRequestDetail,
  financialRequestDetail,
  isDetailLoading,
  match: { params },
  me
}) => {
  useEffect(() => {
    getFinancialRequestDetail(params.id)
  }, [getFinancialRequestDetail, params])

  const initialValues = useMemo(
    () => ({
      type: financialRequestDetail?.type || '',
      amount: financialRequestDetail?.amount || '',
      client:
        financialRequestDetail?.type !== FINANCIALREQUEST_TYPE.SENDPAYMENT
          ? financialRequestDetail?.counter_party.id || ''
          : '',
      partner:
        financialRequestDetail?.type === FINANCIALREQUEST_TYPE.SENDPAYMENT
          ? financialRequestDetail?.counter_party.id || ''
          : '',
      project: financialRequestDetail?.project.id || '',
      ...(me.role !== ROLES.DEVELOPER
        ? {
            sender: financialRequestDetail?.requester.id || ''
          }
        : {})
    }),
    [financialRequestDetail, me.role]
  )

  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        updateFinancialRequestDetail,
        {
          data: {
            ...R.omit(['client', 'partner'], values),
            counter_party: values.type === FINANCIALREQUEST_TYPE.SENDPAYMENT ? values.partner : values.client
          },
          id: params.id
        },
        formActions
      )
    },
    [updateFinancialRequestDetail, params.id]
  )

  if (isDetailLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Financial Request Detail" disableWidgetMenu>
            <Formik
              component={FinancialRequestDetailForm}
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
  getFinancialRequestDetail,
  updateFinancialRequestDetail
}

const selectors = createStructuredSelector({
  financialRequestDetail: financialRequestDetailSelector,
  isDetailLoading: financialRequestDetailLoadingSelector,
  me: meSelector
})

FinancialRequestEdit.propTypes = {
  getFinancialRequestDetail: PropTypes.func.isRequired,
  updateFinancialRequestDetail: PropTypes.func.isRequired,
  financialRequestDetail: PropTypes.object,
  isDetailLoading: PropTypes.bool.isRequired,
  params: PropTypes.object,
  me: PropTypes.object
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions
  )
)(FinancialRequestEdit)
