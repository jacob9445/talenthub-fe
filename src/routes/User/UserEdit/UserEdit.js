import React, { useEffect, useCallback, useMemo } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { pick, get } from 'lodash'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

import { formSubmit } from 'helpers/form'
import { getUserDetail, userDetailSelector, userDetailLoadingSelector } from 'store/modules/user'
import { updateUserDetail } from 'store/modules/user'
import UserDetailForm from 'routes/User/UserDetailForm'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'
import ProfileChips from 'components/ProfileChips'

const UserEdit = ({ match: { params }, getUserDetail, userDetail, updateUserDetail }) => {
  useEffect(() => {
    getUserDetail(params.id)
  }, [params, getUserDetail])

  const initialValues = useMemo(() => {
    return !userDetail
      ? {
          first_name: '',
          last_name: '',
          email: '',
          team: ''
        }
      : {
          ...pick(userDetail, ['first_name', 'last_name', 'email']),
          team: get(userDetail, 'team.id')
        }
  }, [userDetail])

  const handleSubmit = useCallback(
    (payload, formActions) => {
      console.log({ payload })
      return formSubmit(
        updateUserDetail,
        {
          data: payload,
          id: params.id
        },
        formActions
      )
    },
    [updateUserDetail, params.id]
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
              enableReinitialize
            />
          </Widget>
        </Grid>
        <Grid item xs={12} md={3}>
          <Widget title="Profiles" disableWidgetMenu>
            <ProfileChips profiles={userDetail.profiles} />
          </Widget>
        </Grid>
      </Grid>
    )
}

const selectors = createStructuredSelector({
  userDetail: userDetailSelector,
  loadingSelectedUser: userDetailLoadingSelector
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

export default compose(
  connect(
    selectors,
    actions
  ),
  withRouter
)(UserEdit)
