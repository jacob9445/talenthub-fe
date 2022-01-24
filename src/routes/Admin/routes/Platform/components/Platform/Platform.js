import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'

import PlatformList from '../../routes/PlatformList'
import PlatformEdit from '../../routes/PlatformEdit'
import PlatformNew from '../../routes/PlatformNew'

const Platform = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={PlatformList} />
    <Route exact path={`${path}/:id/detail`} component={PlatformEdit} />
    <Route exact path={`${path}/new`} component={PlatformNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

Platform.propTypes = {
  match: PropTypes.object.isRequired
}

export default Platform
