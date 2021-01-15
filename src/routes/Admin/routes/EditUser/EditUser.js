import React, { useEffect, useCallback, useMemo } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { pick, get } from 'lodash'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';

import { formSubmit } from 'helpers/form'
import { getUserDetail, userDetailSelector, userDetailLoadingSelector } from 'store/modules/users'
import { updateUserDetail } from 'store/modules/users'
import UserDetailForm from 'components/UserDetailForm'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'
const EditUser = ({match:{params}, getUserDetail, userDetail, updateUserDetail}) => {

  useEffect( () => {
    getUserDetail(params.id)
  }, [params, getUserDetail])

  const initialValues = useMemo(() => {
    return !userDetail ? {
      first_name: '',
      last_name: '',
      email: '',
      team: ''
    } : {
      ...pick(userDetail, ['first_name', 'last_name', 'email']),
      team: get(userDetail, 'team.id')
    }
  }, [userDetail])
  
  const handleSubmit = useCallback((payload, formActions) => {
    console.log({payload})
    return formSubmit( updateUserDetail, {
      data: payload,
      id: params.id,
    }, formActions)
  }, [updateUserDetail, params.id])

  if(!userDetail) return <Spinner />
  else return (
    <div>
      <Widget 
        title='User Details'
        disableWidgetMenu
      >
       <Formik 
        component={UserDetailForm}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        enableReinitialize
       /> 
      </Widget>
    </div>
  )
}

EditUser.propTypes = {
  params: PropTypes.number,
  getUserDetail: PropTypes.func,
  userDetail: PropTypes.object,
}

const selectors = createStructuredSelector({
  userDetail: userDetailSelector,
  loadingSelectedUser: userDetailLoadingSelector
})
const actions = {
  getUserDetail,
  updateUserDetail
}

export default compose(
  connect(selectors, actions),
  withRouter
)(EditUser)