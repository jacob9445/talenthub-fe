import React, { useEffect, useCallback, useMemo } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Formik } from 'formik'
import { pick, get } from 'lodash'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';

import { formSubmit } from 'helpers/form'
import { getCertainUser, certainUserSelector, certainUserLoadingSelector } from 'store/modules/users'
import { updateCertainUser } from 'store/modules/users'
import EditUserForm from './components/EditUserForm'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'
const EditUser = ({match:{params}, getCertainUser, selectedUser, loadingSelectedUser, updateCertainUser}) => {

  useEffect( () => {
    getCertainUser(params.id)
  }, [params, getCertainUser])

  const initialValues = useMemo(() => {
    return !selectedUser ? {
      first_name: '',
      last_name: '',
      email: '',
      team: ''
    } : {
      ...pick(selectedUser, ['first_name', 'last_name', 'email']),
      team: get(selectedUser, 'team.id')
    }
  }, [selectedUser])
  
  const handleSubmit = useCallback((payload, formActions) => {
    console.log({payload})
    return formSubmit( updateCertainUser, {
      data: payload,
      id: params.id,
    }, formActions)
  }, [updateCertainUser, params.id])

  if( !loadingSelectedUser) return <Spinner />
  else return (
    <div>
      <Widget 
        title='User Information'
        disableWidgetMenu
      >
       <Formik 
        component={EditUserForm}
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
  getCertainUser: PropTypes.func,
  selectedUser: PropTypes.object,
  loadingSelectedUser: PropTypes.bool
}

const selectors = createStructuredSelector({
  selectedUser: certainUserSelector,
  loadingSelectedUser: certainUserLoadingSelector
})
const actions = {
  getCertainUser,
  updateCertainUser
}

export default compose(
  connect(selectors, actions),
  withRouter
)(EditUser)