import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getCertainUser, certainUserSelector } from 'store/modules/users'
const EditUser = ({match:{params}, getCertainUser, selectedUser}) => {

  useEffect( () => {
    getCertainUser(params.id)
  }, [params, getCertainUser])

  console.log( selectedUser)
  
  return (
    <div>
      Edit User
    </div>
  )
}

const selectors = createStructuredSelector({
  selectedUser: certainUserSelector
})
const actions = {
  getCertainUser
}

export default compose(
  connect(selectors, actions),
  withRouter
)(EditUser)