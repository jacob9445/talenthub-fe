import React from 'react'
import  { createStructuredSelector } from 'reselect'
import  { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import { meSelector, isAuthenticatedSelector, meRejectedSelector } from '../store/modules/auth'
import Login from './Login'
import AuthRoute from './AuthRoute'
import PrivateRoute from './PrivateRoute'
import Admin from './Admin'
import TeamManager from './TeamManager'

import { URL_PREFIXES } from 'config/constants'

const Routes = ({ me, isAuthenticated, meRejected }) => {
	return (
    <Switch>
			<Route exact path='/'
				render={() => (
					isAuthenticated && me ? (
						<Redirect to={`${URL_PREFIXES[me.role]}/dashboard`}/>
					) : meRejected ? (
						<Redirect to='/login'/>
					) : <h1>Loading...</h1>
				)}
			/>
			<AuthRoute path='/login' component={Login} />
			<PrivateRoute path='/admin' component={Admin} />
			<PrivateRoute path='/team-manager' component={TeamManager} />
    </Switch>
	)
}

const selectors = createStructuredSelector({
	me: meSelector,
	isAuthenticated: isAuthenticatedSelector,
	meRejected: meRejectedSelector
})

export default connect(selectors)(Routes)