import React, { Suspense, lazy } from 'react'
import { createStructuredSelector } from 'reselect'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import { meSelector, isAuthenticatedSelector } from 'store/modules/auth'
import PropTypes from 'prop-types'
import { URL_PREFIXES } from 'config/constants'

const Login = lazy(() => import('./Login'))
const AuthRoute = lazy(() => import('components/AuthRoute'))
const PrivateRoute = lazy(() => import('components/PrivateRoute'))
const Admin = lazy(() => import('./Admin'))
const TeamManager = lazy(() => import('./TeamManager'))
const Developer = lazy(() => import('./Developer'))
const Spinner = lazy(() => import('../components/Spinner'))

const Routes = ({ me, isAuthenticated }) => {
  return (
    <Suspense fallback={() => <Spinner />}>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated ? <Redirect to={`${URL_PREFIXES[me.role]}/dashboard`} /> : <Redirect to="/login" />
          }
        />
        <AuthRoute path="/login" component={Login} />
        <PrivateRoute path="/admin" component={Admin} />
        <PrivateRoute path="/team-manager" component={TeamManager} />
        <PrivateRoute path="/developer" component={Developer} />
      </Switch>
    </Suspense>
  )
}

const selectors = createStructuredSelector({
  me: meSelector,
  isAuthenticated: isAuthenticatedSelector
})

Routes.propTypes = {
  me: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired
}

export default connect(selectors)(Routes)
