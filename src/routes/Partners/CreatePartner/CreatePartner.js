import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import PartnerDetailForm, { validationSchema } from '../PartnerDetailForm'
import { formSubmit } from 'helpers/form'
import { createPartner } from 'store/modules/partners'

const initialValues = {
  full_name: '',
  email: '',
  address: '',
  dob: '',
  phone_num: '',
  contact_method: ''
}

const CreatePartner = ({ createPartner }) => {
  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        createPartner,
        {
          data: payload
        },
        formActions
      )
    },
    [createPartner]
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget title="Create Partner" disableWidgetMenu>
          <Formik
            component={PartnerDetailForm}
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
  createPartner
}

CreatePartner.propTypes = {
  createPartner: PropTypes.func.isRequired
}

export default connect(
  null,
  actions
)(CreatePartner)
