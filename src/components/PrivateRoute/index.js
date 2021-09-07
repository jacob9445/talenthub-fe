import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { isAuthenticatedSelector } from 'store/modules/auth/selectors'
import { useLayoutState } from 'context/LayoutContext'
import classnames from 'classnames'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import NotificationCenter from 'components/NotificationCenter'
import { subscribeToNotification, unsubscribeToNotification } from 'store/modules/notification'
import useStyles from './styles'

const PrivateRoute = ({
  path,
  component: Component,
  isAuthenticated,
  subscribeToNotification,
  unsubscribeToNotification,
  ...others
}) => {
  let classes = useStyles()
  let layoutState = useLayoutState()
  useEffect(() => {
    subscribeToNotification()
    return () => {
      unsubscribeToNotification()
    }
  }, [subscribeToNotification, unsubscribeToNotification])

  return (
    <Route
      path={path}
      {...others}
      render={props => {
        return isAuthenticated ? (
          <React.Fragment>
            <Header />
            <Sidebar />
            <NotificationCenter />
            <div
              className={classnames(classes.content, {
                [classes.contentShift]: layoutState.isSidebarOpened
              })}>
              <div className={classes.fakeToolbar} />
              <Component {...props} />
            </div>
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }}
    />
  )
}

const selectors = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

const actions = {
  subscribeToNotification,
  unsubscribeToNotification
}

PrivateRoute.propTypes = {
  subscribeToNotification: PropTypes.func.isRequired,
  unsubscribeToNotification: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default connect(selectors, actions)(PrivateRoute)
