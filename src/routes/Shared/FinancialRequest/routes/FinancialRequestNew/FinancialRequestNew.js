import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import FinancialRequestDetailForm, { validationSchema } from '../../components/FinancialRequestEditForm'
import { formSubmit } from 'helpers/form'
import { meSelector } from 'store/modules/auth'
import { createFinancialRequest } from 'store/modules/financialRequest'
import { FINANCIALREQUEST_TYPE, URL_PREFIXES, PAYMENT_PLATFORM_TYPE } from 'config/constants'

const initialValues = {
  type: FINANCIALREQUEST_TYPE.SENDINVOICE,
  amount: '',
  address: '',
  project: '',
  description: '',
  checkbox: false,
  platform: PAYMENT_PLATFORM_TYPE.PAYPAL,
  payment_address: '',
  display_name: ''
}

const FinancialRequestNew = ({ createFinancialRequest, history, me: { role } }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createFinancialRequest,
        {
          data: values,
          success: () => history.push(`/${URL_PREFIXES[role]}/financial-requests`)
        },
        formActions
      )
    },
    [createFinancialRequest, history, role]
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget title="Create Financial Request" disableWidgetMenu>
          <Formik
            component={FinancialRequestDetailForm}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          />
        </Widget>
      </Grid>
    </Grid>
  )
}

const actions = {
  createFinancialRequest
}

const selectors = createStructuredSelector({
  me: meSelector
})

FinancialRequestNew.propTypes = {
  createFinancialRequest: PropTypes.func.isRequired,
  me: PropTypes.object
}

export default compose(withRouter, connect(selectors, actions))(FinancialRequestNew)
