import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import PlatformDetailForm, { validationSchema } from '../../components/PlatformDetailForm'
import { formSubmit } from 'helpers/form'
import { createPlatform } from 'store/modules/platform'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const initialValues = {
  name: ''
}

const PlatformNew = ({ createPlatform, me, history }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createPlatform,
        {
          data: values,
          success: resData => history.push(`/${URL_PREFIXES[me.role]}/platforms`)
        },
        formActions
      )
    },
    [createPlatform, me, history]
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget title="Create Payment Account" disableWidgetMenu>
          <Formik
            component={PlatformDetailForm}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
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
  createPlatform
}

PlatformNew.propTypes = {
  createPlatform: PropTypes.func.isRequired,
  me: PropTypes.object
}

export default compose(withRouter, connect(selector, actions))(PlatformNew)
