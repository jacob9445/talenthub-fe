import  React, { useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes'
import { history } from './store'
import { authGetMe, isAuthenticatedSelector } from './store/modules/auth'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
function App({isAuthenticated, authGetMe}) {

  useEffect(() => {
    isAuthenticated && authGetMe()
  }, [isAuthenticated, authGetMe])
  return (
    <Router history={history}> 
      <Routes />
    </Router>
  )
}

const actions = {
  authGetMe
}

const selectors = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

export default connect(selectors, actions)(App);
