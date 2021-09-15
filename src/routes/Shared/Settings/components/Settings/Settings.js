import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import PropTypes from 'prop-types'

import AboutMe from 'routes/Shared/Settings/routes/AboutMe/AboutMe'
import ChangePassword from 'routes/Shared/Settings/routes/ChangePassword'

const Settings = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/me`} component={AboutMe} />
      <Route path={`${path}/update-password`} component={ChangePassword} />
      <Redirect to={`${path}/me`} />
    </Switch>
  )
}

Settings.propTypes = {
  match: PropTypes.object.isRequired
}

export default Settings
