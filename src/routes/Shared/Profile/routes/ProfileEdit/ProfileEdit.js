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
import ProfileDetailForm, { validationSchema } from '../../components/ProfileDetailForm'
import Spinner from 'components/Spinner'
import AccountChips from '../../components/AccountChips'
import { meSelector } from 'store/modules/auth'
import { ROLES, URL_PREFIXES } from 'config/constants'

const ProfileEdit = ({ match: { params }, getProfileDetail, profileDetail, updateProfile, isLoading, me, history }) => {
  useEffect(() => {
    getProfileDetail(params.id)
  }, [getProfileDetail, params.id])

  const initialValues = useMemo(
    () => ({
      ...(me.role !== ROLES.DEVELOPER ? { user_id: profileDetail?.user_id || '' } : {}),
      profile_type: profileDetail?.profile_type || '',
      first_name: profileDetail?.first_name || '',
      last_name: profileDetail?.last_name || '',
      address: profileDetail?.address || '',
      country: profileDetail?.country || '',
      dob: profileDetail?.dob || '',
      gender: profileDetail?.gender || '',
      extra_info: profileDetail?.extra_info || ''
    }),
    [profileDetail, me.role]
  )
  const handleSubmit = useCallback(
    (values, formActions) => {
      return formSubmit(
        updateProfile,
        {
          data: {
            ...values,
            ...(me.role !== ROLES.DEVELOPER ? { user_id: values.user_id } : { user_id: me.id })
          },
          id: params.id,
          success: () => history.push(`/${URL_PREFIXES[me.role]}/profiles`)
        },
        formActions
      )
    },
    [updateProfile, params.id, me, history]
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
  isLoading: PropTypes.bool.isRequired,
  me: PropTypes.object
}

const actions = {
  getProfileDetail,
  updateProfile
}

const selector = createStructuredSelector({
  profileDetail: profileDetailSelector,
  isLoading: profileDetailLoadingSelector,
  me: meSelector
})

export default compose(withRouter, connect(selector, actions))(ProfileEdit)
