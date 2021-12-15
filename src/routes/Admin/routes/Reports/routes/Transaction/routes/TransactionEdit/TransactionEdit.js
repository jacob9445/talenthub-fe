import React, { useCallback, useEffect, useMemo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import TransactionDetailForm, { validationSchema } from '../../components/TransactionDetailForm'
import { formSubmit } from 'helpers/form'
import { updateTransaction, getTransactionDetail, transactionDetailSelector } from 'store/modules/transaction'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const TransactionEdit = ({
  updateTransaction,
  me,
  history,
  match: { params },
  getTransactionDetail,
  transactionDetail
}) => {
  useEffect(() => {
    getTransactionDetail(params.id)
  }, [getTransactionDetail, params.id])

  const initialValues = useMemo(
    () => ({
      owner: transactionDetail?.owner,
      address: transactionDetail?.address,
      gross_amount: transactionDetail?.gross_amount,
      net_amount: transactionDetail?.net_amount,
      created_at: transactionDetail?.created_at,
      description: transactionDetail?.description,
      payment_account: transactionDetail?.payment_account
    }),
    [transactionDetail]
  )

  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        updateTransaction,
        {
          data: {
            ...values
          },
          id: params.id,
          success: resData => history.push(`/${URL_PREFIXES[me.role]}/financial-reports/transactions`)
        },
        formActions
      )
    },
    [updateTransaction, me, history, params.id]
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget title="Edit Transaction" disableWidgetMenu>
          <Formik
            component={TransactionDetailForm}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          />
        </Widget>
      </Grid>
    </Grid>
  )
}

const selector = createStructuredSelector({
  me: meSelector,
  transactionDetail: transactionDetailSelector
})

const actions = {
  updateTransaction,
  getTransactionDetail
}

TransactionEdit.propTypes = {
  updateTransaction: PropTypes.func.isRequired,
  me: PropTypes.object
}

export default compose(withRouter, connect(selector, actions))(TransactionEdit)
