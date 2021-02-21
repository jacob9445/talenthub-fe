import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import AccountDetailForm, { validationSchema } from '../AccountDetailForm'
import { formSubmit } from 'helpers/form'
import { createAccount } from 'store/modules/account'
import { PLATFORMS, URL_PREFIXES } from 'config/constants'
import { meSelector } from 'store/modules/auth'

const initialValues = {
  profile: '',
  platform_type: PLATFORMS.EMAIL,
  email: '',
  password: '',
  location: '',
  recovery_email: '',
  url: ''
}

const AccountNew = ({ createAccount, history, me }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createAccount,
        {
          data: {
            ...values
          },
          success: () => history.push(`/${URL_PREFIXES[me.role]}/accounts`)
        },
        formActions
      )
    },
    [createAccount, history, me.role]
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget title="Create Account" disableWidgetMenu>
          <Formik
            component={AccountDetailForm}
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
  createAccount
}

const selectors = createStructuredSelector({
  me: meSelector
})

AccountNew.propTypes = {
  createAccount: PropTypes.func.isRequired,
  me: PropTypes.object
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions
  )
)(AccountNew)
