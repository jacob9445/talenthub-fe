import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import PaymentAccountDetailForm, { validationSchema } from '../../components/PaymentAccountDetailForm'
import { formSubmit } from 'helpers/form'
import { createPaymentAccount } from 'store/modules/paymentAccount'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const initialValues = {
  platform: '',
  address: '',
  display_name: ''
}

const PaymentAccountNew = ({ createPaymentAccount, me, history }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createPaymentAccount,
        {
          data: values,
          success: resData => history.push(`/${URL_PREFIXES[me.role]}/payment-accounts`)
        },
        formActions
      )
    },
    [createPaymentAccount, me, history]
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget title="Create Payment Account" disableWidgetMenu>
          <Formik
            component={PaymentAccountDetailForm}
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
  createPaymentAccount
}

PaymentAccountNew.propTypes = {
  createPaymentAccount: PropTypes.func.isRequired,
  me: PropTypes.object
}

export default compose(withRouter, connect(selector, actions))(PaymentAccountNew)
