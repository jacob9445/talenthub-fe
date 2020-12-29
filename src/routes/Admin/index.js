import React from 'react'
import { Route, Switch} from 'react-router'
import Dashboard from './routes/Dashboard'
import Users from 'components/Users'

const Admin = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/dashboard`} component={Dashboard} />
      <Route path={`${match.path}/users`} component={Users} />
    </Switch>
  )
}

export default Admin