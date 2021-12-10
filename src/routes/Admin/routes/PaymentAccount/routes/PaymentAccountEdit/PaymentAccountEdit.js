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
import PaymentAccountDetailForm, { validationSchema } from '../../components/PaymentAccountDetailForm'
import {
  getPaymentAccountDetail,
  updatePaymentAccountDetail,
  paymentAccountDetailSelector,
  paymentAccountDetailLoadingSelector
} from 'store/modules/paymentAccount'
import Spinner from 'components/Spinner'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const PaymentAccountEdit = ({
  getPaymentAccountDetail,
  updatePaymentAccountDetail,
  paymentAccountDetail,
  isDetailLoading,
  match: { params },
  me,
  history
}) => {
  useEffect(() => {
    getPaymentAccountDetail(params.id)
  }, [getPaymentAccountDetail, params])

  const initialValues = useMemo(
    () => ({
      platform: paymentAccountDetail?.platform || '',
      address: paymentAccountDetail?.address || '',
      displayName: paymentAccountDetail?.displayName || ''
    }),
    [paymentAccountDetail]
  )

  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        updatePaymentAccountDetail,
        {
          data: values,
          success: () => history.push(`/${URL_PREFIXES[me.role]}/payment-accounts`)
        },
        formActions
      )
    },
    [updatePaymentAccountDetail, me, history]
  )

  if (isDetailLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Payment Account Detail" disableWidgetMenu>
            <Formik
              component={PaymentAccountDetailForm}
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
  getPaymentAccountDetail,
  updatePaymentAccountDetail
}

const selectors = createStructuredSelector({
  paymentAccountDetail: paymentAccountDetailSelector,
  isDetailLoading: paymentAccountDetailLoadingSelector,
  me: meSelector
})

PaymentAccountEdit.propTypes = {
  getPaymentAccountDetail: PropTypes.func.isRequired,
  updatePaymentAccountDetail: PropTypes.func.isRequired,
  paymentAccountDetail: PropTypes.object,
  isDetailLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  me: PropTypes.object
}

export default compose(withRouter, connect(selectors, actions))(PaymentAccountEdit)
