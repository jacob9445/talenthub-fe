import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { format } from 'date-fns'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import { CLIENT_TYPES, URL_PREFIXES } from 'config/constants'
import { createClient } from 'store/modules/client'
import { formSubmit } from 'helpers/form'
import { meSelector } from 'store/modules/auth'
import { ROLES } from 'config/constants'
import ClientDetailForm, { validationSchema } from '../../components/ClientDetailForm'
import Widget from 'components/Widget'

const initialValues = {
  full_name: '',
  type: CLIENT_TYPES.COMPANY,
  company_name: '',
  started_at: format(new Date(), 'yyyy-MM-dd'),
  owner: ''
}

const ClientNew = ({ createClient, me, history }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createClient,
        {
          data: {
            ...values,
            ...(me.role === ROLES.DEVELOPER
              ? {
                  owner: me.id
                }
              : {})
          },
          success: () => history.push(`/${URL_PREFIXES[me.role]}/clients`)
        },
        formActions
      )
    },
    [createClient, me, history]
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

const selector = createStructuredSelector({
  me: meSelector
})

const actions = {
  createClient
}

ClientNew.propTypes = {
  createClient: PropTypes.func.isRequired,
  me: PropTypes.object
}

export default compose(withRouter, connect(selector, actions))(ClientNew)
