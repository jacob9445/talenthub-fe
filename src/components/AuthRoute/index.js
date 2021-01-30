import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { isAuthenticatedSelector } from 'store/modules/auth/selectors'
import PropTypes from 'prop-types'

const AuthRoute = ({ path, component: Component, redirectTo = '/', isAuthenticated, ...others }) => (
  <Route
    path={path}
    {...others}
    render={props => {
      return isAuthenticated ? <Redirect to={redirectTo} /> : <Component {...props} />
    }}
  />
)

const selectors = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
}

export default connect(selectors)(AuthRoute)
