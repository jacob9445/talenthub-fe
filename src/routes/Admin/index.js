import React from 'react'
import { Route, Switch} from 'react-router'
import Dashboard from './routes/Dashboard'
import EditUser from './routes/EditUser'
import Users from 'components/Users'
import CreateUser from './routes/CreateUser'
import Teams from './routes/Teams'
import Profiles from './routes/Profiles'
import EditProfile from './routes/Profiles/containers/EditProfile'
const Admin = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/dashboard`} component={Dashboard} />
      <Route exact path={`${match.path}/users`} component={Users} />
      <Route path={`${match.path}/users/new`} component={CreateUser} />
      <Route path={`${match.path}/users/:id/edit`} component={EditUser} />
      <Route path={`${match.path}/teams`} component={Teams}/>
      <Route exact path={`${match.path}/profiles`} component={Profiles} />
      <Route path={`${match.path}/profiles/:id/edit`} component={EditProfile} />
    </Switch>
  )
}

export default Admin