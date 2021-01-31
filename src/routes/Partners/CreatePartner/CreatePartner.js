import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'

import Widget from 'components/Widget'
import PartnerDetailForm, { validationSchema } from '../PartnerDetailForm'
import { formSubmit } from 'helpers/form'
import { createPartner } from 'store/modules/partners'
import { meSelector } from 'store/modules/auth'
import { ROLES } from 'config/constants'

const initialValues = {
  full_name: '',
  email: '',
  address: '',
  dob: '',
  phone_num: '',
  owner: '',
  contact_method: ''
}

const CreatePartner = ({ createPartner, me }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createPartner,
        {
          data: {
            ...values,
            ...(me.role === ROLES.DEVELOPER
              ? {
                  owner: me.id
                }
              : {})
          }
        },
        formActions
      )
    },
    [createPartner, me]
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

const selector = createStructuredSelector({
  me: meSelector
})

const actions = {
  createPartner
}

CreatePartner.propTypes = {
  createPartner: PropTypes.func.isRequired
}

export default connect(
  selector,
  actions
)(CreatePartner)
