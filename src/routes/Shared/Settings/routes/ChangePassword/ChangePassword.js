import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { withRouter } from 'react-router'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import Widget from 'components/Widget'
import ChangePasswordForm from 'routes/Shared/Settings/components/ChangePasswordForm'
import { showMessage } from 'store/modules/message'
import { meSelector } from 'store/modules/auth/selectors'
import { formSubmit } from 'helpers/form'
import { authUpdatePassword } from 'store/modules/auth'

const ChangePassword = ({ authUpdatePassword, showMessage, me }) => {
  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        authUpdatePassword,
        {
          data: {
            current_password: payload.current_password,
            new_password: payload.new_password
          },
          id: me.id,
          success: message =>
            showMessage({
              message: message
            })
        },
        formActions
      )
    },
    [authUpdatePassword, showMessage, me.id]
  )
  const validatePassword = useCallback(formValues => {
    if (formValues.new_password !== formValues.confirm_password) {
      return {
        confirm_password: 'Passwords do not match!'
      }
    }
  }, [])

  const initialValues = {
    current_password: '',
    new_password: '',
    confirm_password: ''
  }

  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required('This field is required!'),
    new_password: Yup.string().required('This field is required!'),
    confirm_password: Yup.string().required('This field is required!')
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Widget title="Password Settings" disableWidgetMenu>
          <Formik
            component={ChangePasswordForm}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            validate={validatePassword}
          />
        </Widget>
      </Grid>
    </Grid>
  )
}

const actions = {
  authUpdatePassword,
  showMessage
}

const selectors = createStructuredSelector({
  me: meSelector
})

ChangePassword.propTypes = {
  authUpdatePassword: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  me: PropTypes.object.isRequired
}

export default connect(selectors, actions)(withRouter(ChangePassword))
