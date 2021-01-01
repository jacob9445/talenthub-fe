import  React, { useEffect } from 'react'
import { Router } from 'react-router-dom'
import Routes from './routes'
import { history } from './store'
import { authGetMe, isAuthenticatedSelector, meLoadingSelector } from './store/modules/auth'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

function App({isAuthenticated, authGetMe, meLoading}) {

  useEffect(() => {
    isAuthenticated && authGetMe()
  }, [isAuthenticated, authGetMe])
  
  if( isAuthenticated && meLoading) {
    return <h1>Loading</h1>
  } else {
    return (
      <Router history={history}> 
        <Routes />
      </Router>
    )
  }
}

const actions = {
  authGetMe
}

const selectors = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  meLoading: meLoadingSelector,
})

export default connect(selectors, actions)(App);
