import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import Widget from 'components/Widget'
import ClientDetailForm, { validationSchema } from '../ClientDetailForm'
import { formSubmit } from 'helpers/form'
import { createClient } from 'store/modules/clients'
import { CLIENT_TYPES } from 'config/constants'

const initialValues = {
  full_name: '',
  type: CLIENT_TYPES.COMPANY,
  company_name: '',
  started_at: format(new Date(), 'yyyy-MM-dd'),
  owner: ''
}

const CreateClient = ({ createClient }) => {
  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        createClient,
        {
          data: payload
        },
        formActions
      )
    },
    [createClient]
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget title="Create Client" disableWidgetMenu>
          <Formik
            component={ClientDetailForm}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          />
        </Widget>
      </Grid>
    </Grid>
  )
}

const actions = {
  createClient
}

CreateClient.propTypes = {
  createClient: PropTypes.func.isRequired
}

export default connect(
  null,
  actions
)(CreateClient)
