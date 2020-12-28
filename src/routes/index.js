import React from 'react'
import  { createStructuredSelector } from 'reselect'
import  { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

import { authSelector } from '../store/modules/auth'
import Login from './Login'
import Dashboard from './pages/Dashboard'
import AuthRoute from './AuthRoute'
import PrivateRoute from './PrivateRoute'

const Routes = ({auth}) => {
	return (
    <React.Fragment>
			<Route exact path='/'
				render={
					() => auth ? <Redirect to='/dashboard'/> : <Redirect to='/login'/>
				}
			/>
			<AuthRoute path='/login' component={Login} />
			<PrivateRoute path='/dashboard' component={Dashboard}/>
    </React.Fragment>
	)
}

const selectors = createStructuredSelector({
	auth: authSelector
})

export default connect(selectors)(Routes)