import React, { useEffect } from 'react'
import { Router } from 'react-router-dom'
import Routes from './routes'
import { history } from './store'
import { authGetMe, isAuthenticatedSelector, meLoadingSelector } from './store/modules/auth'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Spinner from './components/Spinner'
import Message from './components/Message'
import PropTypes from 'prop-types'
import ConfirmModal from 'components/ConfirmModal'

function App({ isAuthenticated, authGetMe, meLoading }) {
  useEffect(() => {
    isAuthenticated && authGetMe()
  }, [isAuthenticated, authGetMe])

  if (isAuthenticated && meLoading) {
    return <Spinner />
  } else {
    return (
      <Router history={history}>
        <Routes />
        <Message />
        <ConfirmModal />
      </Router>
    )
  }
}

const actions = {
  authGetMe
}

const selectors = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  meLoading: meLoadingSelector
})

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authGetMe: PropTypes.func.isRequired,
  meLoading: PropTypes.bool.isRequired
}

export default connect(
  selectors,
  actions
)(App)
