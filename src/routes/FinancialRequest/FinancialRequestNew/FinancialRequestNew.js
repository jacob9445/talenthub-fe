import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import Widget from 'components/Widget'
import FinancialRequestDetailForm, { validationSchema } from '../FinancialRequestDetailForm'
import { formSubmit } from 'helpers/form'
import { createFinancialRequest } from 'store/modules/financialRequest'
import { FINANCIALREQUEST_TYPE } from 'config/constants'

const initialValues = {
  type: FINANCIALREQUEST_TYPE.SENDINVOICE,
  amount: '',
  client: '',
  partner: '',
  project: ''
}

const FinancialRequestNew = ({ createFinancialRequest }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createFinancialRequest,
        {
          data: {
            ...R.omit(['client', 'partner'], values),
            counter_party: values.type === FINANCIALREQUEST_TYPE.SENDPAYMENT ? values.partner : values.client
          }
        },
        formActions
      )
    },
    [createFinancialRequest]
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

FinancialRequestNew.propTypes = {
  createFinancialRequest: PropTypes.func.isRequired
}

export default connect(
  null,
  actions
)(FinancialRequestNew)
