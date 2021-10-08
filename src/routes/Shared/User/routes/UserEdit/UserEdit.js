import React, { useEffect, useCallback, useMemo } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { path, pick } from 'ramda'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

import { formSubmit } from 'helpers/form'
import { getUserDetail, userDetailSelector, userDetailLoadingSelector } from 'store/modules/user'
import { updateUserDetail } from 'store/modules/user'
import UserDetailForm, { validationSchema, initialValues as values } from '../../components/UserDetailForm'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'
import ProfileChips from 'components/ProfileChips'
import { URL_PREFIXES } from 'config/constants'
import { roleSelector } from 'store/modules/auth'
import { meSelector } from 'store/modules/auth'

const UserEdit = ({ match: { params }, getUserDetail, userDetail, updateUserDetail, history, role, me }) => {
  useEffect(() => {
    getUserDetail(params.id)
  }, [params, getUserDetail])

  const initialValues = useMemo(() => {
    return !userDetail
      ? values
      : {
          ...pick(['first_name', 'last_name', 'email', 'role'], userDetail),
          team: path(['team', 'id'], userDetail)
        }
  }, [userDetail])

  const handleSubmit = useCallback(
    (payload, formActions) => {
      return formSubmit(
        updateUserDetail,
        {
          data: payload,
          id: params.id,
          success: () => history.push(`/${URL_PREFIXES[role]}/users`)
        },
        formActions
      )
    },
    [updateUserDetail, params.id, history, role]
  )

  if (!userDetail) return <Spinner />
  else
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Widget title="User Details" disableWidgetMenu>
            <Formik
              component={UserDetailForm}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize
            />
          </Widget>
        </Grid>
        <Grid item xs={12} md={3}>
          <Widget title="Profiles" disableWidgetMenu>
            <ProfileChips profiles={userDetail.profiles} me={me} />
          </Widget>
        </Grid>
      </Grid>
    )
}

const selectors = createStructuredSelector({
  userDetail: userDetailSelector,
  loadingSelectedUser: userDetailLoadingSelector,
  role: roleSelector,
  me: meSelector
})
const actions = {
  getUserDetail,
  updateUserDetail
}

UserEdit.propTypes = {
  params: PropTypes.number,
  userDetail: PropTypes.object,
  getUserDetail: PropTypes.func.isRequired,
  updateUserDetail: PropTypes.func.isRequired
}

export default compose(connect(selectors, actions), withRouter)(UserEdit)
