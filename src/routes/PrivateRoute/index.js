import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { meSelector } from '../../store/modules/auth/selectors'
import Header from '../../components/Header'
import Sidebar from 'components/Sidebar'
import useStyles from './styles'
import { useLayoutState } from "../../context/LayoutContext";
import classnames from 'classnames'

const PrivateRoute = ({path, component:Component, me, ...others}) => {
  let classes = useStyles()
  let layoutState = useLayoutState();
  return (
    <Route 
      path={path}
      {...others}
      render={
        (props) => {
          return me ? (
            <React.Fragment>
              <Header />
              <Sidebar />
              <div
                className={classnames(classes.content, {
                  [classes.contentShift]: layoutState.isSidebarOpened,
                })}
              >
                <div className={classes.fakeToolbar} />
                <Component {...props}/>
              </div>
            </React.Fragment>
          ) : <Redirect to='/login' /> 
        }
      }
    />
  ) 
}

const selectors = createStructuredSelector({
  me: meSelector
})

export default connect(selectors)(PrivateRoute)



