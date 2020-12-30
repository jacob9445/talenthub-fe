import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { isAuthenticatedSelector } from '../../store/modules/auth/selectors'

const AuthRoute = ({path, component:Component, redirectTo = '/', isAuthenticated, ...others}) => (
  
  <Route 
    path={path}
    {...others}
    render={
      (props) => {
        return isAuthenticated ?  <Redirect to={redirectTo} /> : <Component {...props} /> 
      }
    }
  />
)

const selectors = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

export default connect(selectors)(AuthRoute)



