import React from 'react'
import { Route, Switch} from 'react-router'
import Dashboard from './routes/Dashboard'

const Admin = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/dashboard`} component={Dashboard} />
    </Switch>
  )
}

export default Admin