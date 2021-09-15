import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'
import UserList from '../../routes/UserList'
import UserEdit from '../../routes/UserEdit'
import UserNew from '../../routes/UserNew'

const User = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={UserList} />
    <Route exact path={`${path}/:id/detail`} component={UserEdit} />
    <Route exact path={`${path}/new`} component={UserNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

User.propTypes = {
  match: PropTypes.object.isRequired
}

export default User
