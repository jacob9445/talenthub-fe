import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { isAuthenticatedSelector } from '../../store/modules/auth/selectors'
import Header from '../../components/Header'
import Sidebar from 'components/Sidebar'
import useStyles from './styles'
import { useLayoutState } from '../../context/LayoutContext'
import classnames from 'classnames'

const PrivateRoute = ({ path, component: Component, isAuthenticated, ...others }) => {
  let classes = useStyles()
  let layoutState = useLayoutState()
  return (
    <Route
      path={path}
      {...others}
      render={props => {
        return isAuthenticated ? (
          <React.Fragment>
            <Header />
            <Sidebar />
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

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default connect(selectors)(PrivateRoute)
