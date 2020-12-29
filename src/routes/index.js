import React from 'react'
import  { createStructuredSelector } from 'reselect'
import  { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import { authSelector } from '../store/modules/auth'
import Login from './Login'
import AuthRoute from './AuthRoute'
import PrivateRoute from './PrivateRoute'
import Admin from './Admin'
import TeamManager from './TeamManager'

import { URL_PREFIXES } from 'config/constants'

const Routes = ({auth}) => {
	return (
    <Switch>
			<Route exact path='/'
				render={
					() => auth ? <Redirect to={`${URL_PREFIXES[auth.role]}/dashboard`}/> : <Redirect to='/login'/>
				}
			/>
			<AuthRoute path='/login' component={Login} />
			<PrivateRoute path='/admin' component={Admin} />
			<PrivateRoute path='/team-manager' component={TeamManager} />
    </Switch>
	)
}

const selectors = createStructuredSelector({
	auth: authSelector
})

export default connect(selectors)(Routes)