import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'
import ProfileList from '../../routes/ProfileList'
import ProfileEdit from '../../routes/ProfileEdit'
import ProfileNew from '../../routes/ProfileNew'

const Profile = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={ProfileList} />
    <Route exact path={`${path}/:id/detail`} component={ProfileEdit} />
    <Route exact path={`${path}/new`} component={ProfileNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

Profile.propTypes = {
  match: PropTypes.object.isRequired
}

export default Profile
