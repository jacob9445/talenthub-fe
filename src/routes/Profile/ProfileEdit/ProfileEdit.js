import React, { useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'ramda'
import { Formik } from 'formik'
import { Grid } from '@material-ui/core'

import {
  getProfileDetail,
  profileDetailSelector,
  updateProfile,
  profileDetailLoadingSelector
} from 'store/modules/profile'
import Widget from 'components/Widget'
import { formSubmit } from 'helpers/form'
import ProfileDetailForm, { validationSchema } from '../ProfileDetailForm'
import Spinner from 'components/Spinner'
import AccountChips from './AccountChips'

const ProfileEdit = ({ match: { params }, getProfileDetail, profileDetail, updateProfile, isLoading }) => {
  useEffect(() => {
    getProfileDetail(params.id)
  }, [getProfileDetail, params.id])

  const initialValues = useMemo(
    () => ({
      user_id: profileDetail?.user_id || '',
      profile_type: profileDetail?.profile_type || '',
      first_name: profileDetail?.first_name || '',
      last_name: profileDetail?.last_name || '',
      address: profileDetail?.address || '',
      country: profileDetail?.country || '',
      dob: profileDetail?.dob || '',
      gender: profileDetail?.gender || ''
    }),
    [profileDetail]
  )
  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        updateProfile,
        {
          data: payload,
          id: params.id
        },
        formActions
      )
    },
    [updateProfile, params.id]
  )

  if (isLoading || !profileDetail) return <Spinner />
  else
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Widget title="Profile Detail" disableWidgetMenu>
            <Formik
              component={ProfileDetailForm}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              enableReinitialize
            />
          </Widget>
        </Grid>
        <Grid item xs={12} md={3}>
          <Widget title="Accounts" disableWidgetMenu>
            <AccountChips accounts={profileDetail.accounts} />
          </Widget>
        </Grid>
      </Grid>
    )
}

ProfileEdit.propTypes = {
  params: PropTypes.string,
  getProfileDetail: PropTypes.func.isRequired,
  profileDetail: PropTypes.object,
  updateProfile: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

const actions = {
  getProfileDetail,
  updateProfile
}

const selectors = createStructuredSelector({
  profileDetail: profileDetailSelector,
  isLoading: profileDetailLoadingSelector
})

export default compose(
  connect(
    selectors,
    actions
  ),
  withRouter
)(ProfileEdit)
