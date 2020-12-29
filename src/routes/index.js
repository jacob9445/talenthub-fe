import React from 'react'
import  { createStructuredSelector } from 'reselect'
import  { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import { authSelector } from '../store/modules/auth'
import Login from './Login'
import AuthRoute from './AuthRoute'
import PrivateRoute from './PrivateRoute'
import Admin from './admin'
import { ROLES } from 'config/constants'

const urlPrefixes = {
	[ROLES.ADMIN]: {
		prefix: 'admin'
	},
	[ROLES.TEAM_MANAGER]: {
		prefix: 'team-manager'
	},
	[ROLES.DEVELOPER]: {
		prefix: 'developer'
	},
}

const Routes = ({auth}) => {
	return (
    <Switch>
			<Route exact path='/'
				render={
					() => auth ? <Redirect to={`${urlPrefixes[auth.role].prefix}/dashboard`}/> : <Redirect to='/login'/>
				}
			/>
			<AuthRoute path='/login' component={Login} />
			<PrivateRoute path='/admin' component={Admin} />
    </Switch>
	)
}

const selectors = createStructuredSelector({
	auth: authSelector
})

export default connect(selectors)(Routes)