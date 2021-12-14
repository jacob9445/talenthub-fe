import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import TransactionDetailForm, { validatingSchema } from '../../components/TransactionDetailForm'
import { formSubmit } from 'helpers/form'
import { createTransaction } from 'store/modules/transaction'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const initialValues = {
  owner: ' ',
  address: ' ',
  gross_amount: ' ',
  net_amount: ' ',
  created_at: ' ',
  description: ' ',
  payment_account: 0
}

const TransactionNew = ({ createTransaction, me, history }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createTransaction,
        {
          data: values,
          success: resData => history.push(`/${URL_PREFIXES[me.role]}/financial-reports/transactions`)
        },
        formActions
      )
    },
    [createTransaction, me, history]
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget title="Create Transaction" disableWidgetMenu>
          <Formik
            component={TransactionDetailForm}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validatingSchema}
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
  createTransaction
}

TransactionNew.propTypes = {
  createTransaction: PropTypes.func.isRequired,
  me: PropTypes.object
}

export default compose(withRouter, connect(selector, actions))(TransactionNew)
