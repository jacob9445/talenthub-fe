import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import Profile from 'routes/Shared/Profile/routes/Profile/Profile'
import ProfileEdit from 'routes/Shared/Profile/routes/ProfileEdit/ProfileEdit'
import ProfileNew from 'routes/Shared/Profile/routes/ProfileNew/ProfileNew'

const ProfileRoute = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={Profile} />
    <Route exact path={`${path}/:id/detail`} component={ProfileEdit} />
    <Route exact path={`${path}/new`} component={ProfileNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

export default ProfileRoute
