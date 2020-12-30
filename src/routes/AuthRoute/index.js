import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { meSelector } from '../../store/modules/auth/selectors'

const AuthRoute = ({path, component:Component, redirectTo = '/', me, ...others}) => (
  
  <Route 
    path={path}
    {...others}
    render={
      (props) => {
        return me ?  <Redirect to={redirectTo} /> : <Component {...props} /> 
      }
    }
  />
)

const selectors = createStructuredSelector({
  me: meSelector
})

export default connect(selectors)(AuthRoute)



