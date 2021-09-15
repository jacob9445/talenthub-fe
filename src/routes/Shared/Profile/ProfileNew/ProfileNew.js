import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import ProfileDetailForm, { validationSchema } from '../ProfileDetailForm'
import { formSubmit } from 'helpers/form'
import { createProfile } from 'store/modules/profile'
import { meSelector } from 'store/modules/auth'
import { PROFILE_TYPES, GENDER, ROLES, URL_PREFIXES } from 'config/constants'

const initialValues = {
  user_id: '',
  profile_type: PROFILE_TYPES.SELF,
  first_name: '',
  last_name: '',
  address: '',
  country: '',
  dob: '',
  gender: GENDER.MALE,
  extra_info: ''
}

const ProfileNew = ({ createProfile, me, history }) => {
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        createProfile,
        {
          data: {
            ...values,
            ...(me.role !== ROLES.DEVELOPER ? { user_id: values.user_id } : { user_id: me.id })
          },
          success: () => history.push(`/${URL_PREFIXES[me.role]}/profiles`)
        },
        formActions
      )
    },
    [createProfile, me, history]
  )

  return (
    <Grid container>
      <Grid item xs={12}>
        <Widget title="Create Profile" disableWidgetMenu>
          <Formik
            component={ProfileDetailForm}
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
  createProfile
}

ProfileNew.propTypes = {
  createProfile: PropTypes.func.isRequired,
  me: PropTypes.object
}

export default compose(withRouter, connect(selector, actions))(ProfileNew)
