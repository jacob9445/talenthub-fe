import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import User from 'routes/Shared/User/routes/User/User'
import UserEdit from 'routes/Shared/User/routes/UserEdit/UserEdit'
import UserNew from 'routes/Shared/User/routes/UserNew/UserNew'

const UserRoute = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={User} />
    <Route exact path={`${path}/:id/detail`} component={UserEdit} />
    <Route exact path={`${path}/new`} component={UserNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

export default UserRoute
