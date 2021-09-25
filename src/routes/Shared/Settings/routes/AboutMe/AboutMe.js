import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { pick } from 'ramda'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import MyDetailForm from 'routes/Shared/Settings/components/MyDetailForm'
import { meSelector } from 'store/modules/auth/selectors'
import { formSubmit } from 'helpers/form'
import { authUpdateMe } from 'store/modules/auth'
import { showMessage } from 'store/modules/message'

const AboutMe = ({ authUpdateMe, showMessage, me }) => {
  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        authUpdateMe,
        {
          data: payload,
          id: me.id,
          success: () =>
            showMessage({
              message: 'Your settings are saved Successfully!'
            })
        },
        formActions
      )
    },
    [authUpdateMe, showMessage, me.id]
  )

  const initialValues = useMemo(() => {
    return !me
      ? {
          first_name: '',
          last_name: '',
          email: ''
        }
      : pick(['first_name', 'last_name', 'email'], me)
  }, [me])

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('This field is required!'),
    last_name: Yup.string().required('This field is required!'),
    email: Yup.string().required('This field is required!')
  })

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Widget title="Settings" disableWidgetMenu>
          <Formik
            component={MyDetailForm}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
          />
        </Widget>
      </Grid>
    </Grid>
  )
}

const actions = {
  authUpdateMe,
  showMessage
}

const selectors = createStructuredSelector({
  me: meSelector
})

AboutMe.propTypes = {
  authUpdateMe: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  me: PropTypes.object.isRequired
}

export default connect(selectors, actions)(withRouter(AboutMe))
