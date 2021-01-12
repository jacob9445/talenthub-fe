import React from 'react'
import { Route, Switch} from 'react-router'
import Dashboard from './routes/Dashboard'
import EditUser from './routes/EditUser'
import Users from 'components/Users'
import CreateUser from './routes/CreateUser'

const Admin = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/dashboard`} component={Dashboard} />
      <Route exact path={`${match.path}/users`} component={Users} />
      <Route path={`${match.path}/users/new`} component={CreateUser} />
      <Route path={`${match.path}/users/:id/edit`} component={EditUser} />
    </Switch>
  )
}

export default Admin