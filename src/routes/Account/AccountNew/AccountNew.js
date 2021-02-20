import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import AccountDetailForm, { validationSchema } from '../AccountDetailForm'
import { formSubmit } from 'helpers/form'
import { createAccount } from 'store/modules/account'
import { PLATFORMS } from 'config/constants'

const initialValues = {
  profile: '',
  platform_type: PLATFORMS.EMAIL,
  email: '',
  password: '',
  location: '',
  recovery_email: '',
  url: ''
}

const AccountNew = ({ createAccount }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createAccount,
        {
          data: {
            ...values
          }
        },
        formActions
      )
    },
    [createAccount]
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

AccountNew.propTypes = {
  createAccount: PropTypes.func.isRequired
}

export default connect(
  null,
  actions
)(AccountNew)
