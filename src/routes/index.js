import React from 'react'
import { createStructuredSelector } from 'reselect'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import { meSelector, isAuthenticatedSelector } from '../store/modules/auth'
import Login from './Login'
import AuthRoute from './AuthRoute'
import PrivateRoute from './PrivateRoute'
import Admin from './Admin'
import TeamManager from './TeamManager'
import Developer from './Developer'
import PropTypes from 'prop-types'
import { URL_PREFIXES } from 'config/constants'

const Routes = ({ me, isAuthenticated }) => {
  return (
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
