import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { authSelector } from '../../store/modules/auth/selectors'

const AuthRoute = ({path, component:Component, redirectTo = '/', profile, ...others}) => (
  
  <Route 
    path={path}
    {...others}
    render={
      (props) => {
        return profile ?  <Redirect to={redirectTo} /> : <Component {...props} /> 
      }
    }
  />
)

const selectors = createStructuredSelector({
  profile: authSelector
})

export default connect(selectors)(AuthRoute)



