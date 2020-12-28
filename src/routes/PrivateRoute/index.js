import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { authSelector } from '../../store/modules/auth/selectors'
import Header from '../../components/Header';
import { Grid } from '@material-ui/core'
import './style.scss'

const PrivateRoute = ({path, component:Component, profile, ...others}) => (
    <Route 
      path={path}
      {...others}
      render={
        (props) => {
          return profile ? (
            <React.Fragment>
              <Header />
              <Grid container className='main'>
                <Component {...props} />
              </Grid>
            </React.Fragment>
          ) : <Redirect to='/login' /> 
        }
      }
    />
)

const selectors = createStructuredSelector({
  profile: authSelector
})

export default connect(selectors)(PrivateRoute)



