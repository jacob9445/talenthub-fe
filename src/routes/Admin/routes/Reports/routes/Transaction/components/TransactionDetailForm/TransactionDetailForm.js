import React, { useCallback, useMemo, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { Field } from 'formik'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as Yup from 'yup'
import { createStructuredSelector } from 'reselect'

import FormInput from 'components/FormInput'
import FormEditableSelect from 'components/FormEditableSelect'
import useStyles from './styles'
import { URL_PREFIXES } from 'config/constants'
import { getFullName } from 'helpers/utils'
import { meSelector } from 'store/modules/auth'
import { getUsers, usersSelector } from 'store/modules/user'
import { getPaymentAccounts, paymentAccountsSelector } from 'store/modules/paymentAccount'
import FormDatePicker from 'components/FormDatePicker'
import FormSelect from 'components/FormSelect'

export const validatingSchema = Yup.object().shape({
  owner: Yup.string().required('This field is required!'),
  address: Yup.string().required('This field is required!'),
  gross_amount: Yup.string().required('This field is required!'),
  net_amount: Yup.string().required('This field is required!'),
  created_at: Yup.string().required('This field is required!'),
  description: Yup.string().required('This field is required!'),
  payment_account: Yup.string().required('This field is required!')
})

const TransactionDetailForm = ({
  handleSubmit,
  // values,
  location,
  history,
  me,
  match: { params },
  users,
  paymentAccounts,
  getUsers,
  getPaymentAccounts
}) => {
  const classes = useStyles()

  useEffect(() => {
    getUsers(me)
    getPaymentAccounts()
  }, [getUsers, getPaymentAccounts, me])

  const handleGoBack = useCallback(() => {
    location.state
      ? history.push(location.state)
      : history.push(`/${URL_PREFIXES[me.role]}/financial-reports/transactions`)
  }, [location, history, me])

  const userOptions = useMemo(
    () =>
      users
        ? users.results.map(user => ({
            value: user.id,
            label: getFullName(user)
          }))
        : [],
    [users]
  )

  const paymentAccountOptions = useMemo(
    () =>
      paymentAccounts
        ? paymentAccounts.results.map(paymentAccount => ({
            value: paymentAccount.id,
            label: `${paymentAccount.display_name} (${paymentAccount.address}) - ${paymentAccount.platform}`
          }))
        : [],
    [paymentAccounts]
  )

  const isUpdateMode = useMemo(() => Boolean(params.id), [params.id])
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={FormEditableSelect}
        htmlId="owner"
        name="owner"
        label="Owner"
        placeholder="Choose one developer..."
        options={userOptions}
      />
      <Field component={FormInput} type="text" htmlId="address" name="address" label="From/To" />
      <Field component={FormInput} type="text" htmlId="gross_amount" name="gross_amount" label="Gross amount" />
      <Field component={FormInput} type="text" htmlId="net_amount" name="net_amount" label="Net amount" />
      <Field component={FormDatePicker} htmlId="created_at" name="created_at" label="Date" />
      <Field
        component={FormInput}
        type="text"
        htmlId="description"
        name="description"
        label="Description"
        extra={{
          multiline: true,
          rows: 5,
          placeholder: '...'
        }}
      />
      <Field
        component={FormSelect}
        htmlId="payment_account"
        name="payment_account"
        label="Payment Accounts"
        options={paymentAccountOptions}
      />
      <div className={classes.formButtonWrapper}>
        <Button type="submit" variant="contained" color="primary" className={classes.formButton}>
          {isUpdateMode ? 'Update' : 'Create'}
        </Button>
        <Button variant="contained" color="secondary" className={classes.formButton} onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </form>
  )
}

TransactionDetailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  me: PropTypes.object,
  match: PropTypes.object.isRequired,
  users: PropTypes.object,
  paymentAccounts: PropTypes.object,
  getUsers: PropTypes.func.isRequired,
  getPaymentAccounts: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  me: meSelector,
  users: usersSelector,
  paymentAccounts: paymentAccountsSelector
})

const actions = {
  getUsers,
  getPaymentAccounts
}
export default compose(withRouter, connect(selector, actions))(TransactionDetailForm)
